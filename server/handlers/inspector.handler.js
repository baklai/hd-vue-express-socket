const Inspector = require('../models/inspector.model');

const WARNING_SOFTWARE = [];

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { updatedAt: -1 }, filters = {} },
    callback
  ) => {
    try {
      const aggregation = [
        [
          {
            $addFields: {
              id: '$_id',
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
                        $ne: ['$$item.Name', 'toarm']
                      },
                      {
                        $ne: ['$$item.Name', 'avpz']
                      },
                      {
                        $ne: ['$$item.Name', 'admasuf']
                      },
                      {
                        $ne: ['$$item.Name', 'asuf']
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
                                    [...WARNING_SOFTWARE]
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
          { $match: filters },
          { $sort: sort }
        ]
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
      console.log(err);

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
