const Inspector = require('../models/inspector.model');
const UnSoftware = require('../models/unsoftware.model');
const ExAccount = require('../models/exaccount.model');

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { updatedAt: -1 }, filters = {} },
    callback
  ) => {
    try {
      const inspector = {};

      const UNWANTED_SOFTWARE = await UnSoftware.find({});
      const EXCEPTION_USERACCOUNTS = await ExAccount.find({});

      if (filters?.warning) {
        switch (filters.warning) {
          case 'useraccount':
            inspector['inspector.useraccount.warning'] = true;
            break;
          case 'product':
            inspector['inspector.product.warning'] = true;
            break;
          case 'share':
            inspector['inspector.share.warning'] = true;
            break;
          case 'all':
            inspector['$or'] = [
              { 'inspector.useraccount.warning': true },
              { 'inspector.product.warning': true },
              { 'inspector.share.warning': true }
            ];
            break;
        }
        delete filters.warning;
      }

      if (filters?.updatedAt?.$gte && filters?.updatedAt?.$lt) {
        filters.updatedAt.$gte = new Date(filters?.updatedAt.$gte);
        filters.updatedAt.$lt = new Date(filters?.updatedAt.$lt);
      }

      const aggregation = [
        {
          $match: filters
        },
        {
          $addFields: {
            id: '$_id',

            baseboard: '$baseboard.SerialNumber',

            system: {
              csname: '$os.CSName',
              osname: '$os.Caption',
              platform: '$os.OSArchitecture',
              version: '$os.Version'
            },

            cpu: { $trim: { input: '$cpu.Name' } },

            hdd: {
              $reduce: {
                input: '$diskdrive',
                initialValue: 0,
                in: {
                  $sum: [
                    {
                      $convert: {
                        input: '$$this.Size',
                        to: 'long',
                        onError: 0,
                        onNull: 0
                      }
                    },
                    '$$value'
                  ]
                }
              }
            },

            ram: {
              $reduce: {
                input: '$memorychip',
                initialValue: 0,
                in: {
                  $sum: [
                    {
                      $convert: {
                        input: '$$this.Capacity',
                        to: 'long',
                        onError: 0,
                        onNull: 0
                      }
                    },
                    '$$value'
                  ]
                }
              }
            },

            warningUseraccount: {
              $filter: {
                input: '$useraccount',
                as: 'item',
                cond: {
                  $and: [
                    {
                      $ne: ['$$item.Disabled', 1]
                    },
                    {
                      $not: {
                        $in: ['$$item.Name', [...EXCEPTION_USERACCOUNTS.map((item) => item.name)]]
                      }
                    }
                  ]
                }
              }
            },

            warningShare: {
              $filter: {
                input: '$share',
                as: 'item',
                cond: {
                  $and: [
                    {
                      $ne: ['$$item.Name', 'print$']
                    },
                    {
                      $ne: ['$$item.Name', 'prnproc$']
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            id: 1,
            baseboard: 1,
            host: 1,
            system: 1,
            cpu: 1,
            ram: 1,
            hdd: 1,
            inspector: {
              useraccount: {
                count: {
                  $size: { $ifNull: ['$useraccount', []] }
                },
                warning: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: [{ $size: { $ifNull: ['$warningUseraccount', []] } }, 0] },

                        {
                          $gt: [
                            {
                              $size: {
                                $setIntersection: [
                                  { $ifNull: ['$warningUseraccount.Name', []] },
                                  '$useradmin'
                                ]
                              }
                            },
                            0
                          ]
                        }
                      ]
                    },
                    then: true,
                    else: false
                  }
                }
              },

              product: {
                count: {
                  $size: { $ifNull: ['$product', []] }
                },
                warning: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: [{ $size: { $ifNull: ['$product', []] } }, 0] },
                        {
                          $gt: [
                            {
                              $size: {
                                $setIntersection: [
                                  { $ifNull: ['$product.Name', []] },
                                  [...UNWANTED_SOFTWARE.map((item) => item.name)]
                                ]
                              }
                            },
                            0
                          ]
                        }
                      ]
                    },
                    then: true,
                    else: false
                  }
                }
              },

              share: {
                count: {
                  $size: { $ifNull: ['$share', []] }
                },
                warning: {
                  $cond: {
                    if: {
                      $and: [
                        { $gt: [{ $size: { $ifNull: ['$warningShare', []] } }, 0] },
                        {
                          $gt: [
                            {
                              $size: {
                                $setIntersection: [{ $ifNull: ['$warningShare.Type', []] }, [0]]
                              }
                            },
                            0
                          ]
                        }
                      ]
                    },
                    then: true,
                    else: false
                  }
                }
              }
            },
            updatedAt: 1
          }
        },
        { $match: inspector },
        { $sort: sort }
      ];
      const aggregateQuery = Inspector.aggregate(aggregation);
      const response = await Inspector.aggregatePaginate(aggregateQuery, {
        offset,
        limit: Number(limit) === -1 ? await Inspector.countDocuments() : Number(limit),
        lean: false,
        allowDiskUse: true
      });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Inspector.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const ipaddress = socket.remoteAddress;
      const response = await Inspector.findOneAndUpdate(
        {
          host: ipaddress
        },
        {
          host: ipaddress,
          [payload.field]:
            payload.type === 'object' ? payload[payload.field][0] : payload[payload.field]
        },
        {
          new: true,
          upsert: true,
          rawResult: true
        }
      );
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Inspector.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Inspector.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('inspector:find:all', findAll);
  socket.on('inspector:find:one', findOne);
  socket.on('inspector:create:one', createOne);
  socket.on('inspector:update:one', updateOne);
  socket.on('inspector:remove:one', removeOne);
};
