const dayjs = require('dayjs');

const User = require('../models/user.model');
const Inspector = require('../models/inspector.model');
const Request = require('../models/request.model');
const IPAddress = require('../models/ipaddress.model');
const Channel = require('../models/channel.model');
const Сompany = require('../models/company.model');
const Branch = require('../models/branch.model');
const Enterprise = require('../models/enterprise.model');
const Department = require('../models/department.model');
const Position = require('../models/position.model');
const Location = require('../models/location.model');
const Unit = require('../models/unit.model');
const VPN = require('../models/vpn.model');

const WARNING_SOFTWARE = [];

const EXCEPTION_USERACCOUNTS = ['toarm', 'avpz', 'admasuf', 'asuf'];

module.exports = (socket) => {
  const network = async (payload, callback) => {
    try {
      const [
        channels,
        companies,
        branches,
        enterprises,
        locations,
        units,
        vpns,
        statistic,
        barUnits,
        barLocations,
        barBranches,
        barEnterprises
      ] = await Promise.all([
        Channel.countDocuments(),
        Сompany.countDocuments(),
        Branch.countDocuments(),
        Enterprise.countDocuments(),
        Location.countDocuments(),
        Unit.countDocuments(),
        VPN.countDocuments(),

        IPAddress.aggregate([
          {
            $facet: {
              count: [
                {
                  $count: 'count'
                }
              ],
              autoanswer: [
                {
                  $match: {
                    $and: [
                      {
                        autoanswer: {
                          $ne: ''
                        }
                      },
                      {
                        autoanswer: {
                          $ne: '-'
                        }
                      },
                      {
                        autoanswer: {
                          $ne: null
                        }
                      }
                    ]
                  }
                },
                {
                  $count: 'autoanswer'
                }
              ],
              internet: [
                {
                  $match: {
                    $and: [
                      {
                        'internet.mail': {
                          $ne: null
                        }
                      },
                      {
                        'internet.dateOpen': {
                          $ne: null
                        }
                      },
                      {
                        'internet.dateClose': null
                      }
                    ]
                  }
                },
                {
                  $count: 'internet'
                }
              ],
              email: [
                {
                  $match: {
                    $and: [
                      {
                        'email.mail': {
                          $ne: null
                        }
                      },
                      {
                        'email.dateOpen': {
                          $ne: null
                        }
                      },
                      {
                        'email.dateClose': null
                      }
                    ]
                  }
                },
                {
                  $count: 'email'
                }
              ]
            }
          },
          {
            $addFields: {
              count: {
                $first: '$count.count'
              },
              autoanswer: {
                $first: '$autoanswer.autoanswer'
              },
              internet: {
                $first: '$internet.internet'
              },
              email: {
                $first: '$email.email'
              }
            }
          }
        ]).allowDiskUse(true),
        IPAddress.aggregate([
          {
            $lookup: {
              from: 'units',
              localField: 'unit',
              foreignField: '_id',
              as: 'unit'
            }
          },
          {
            $unwind: {
              path: '$unit',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: '$unit.title',
              count: {
                $sum: 1
              }
            }
          },
          {
            $project: {
              _id: 0,
              title: '$_id',
              count: 1
            }
          }
        ]).allowDiskUse(true),
        IPAddress.aggregate([
          {
            $lookup: {
              from: 'locations',
              localField: 'location',
              foreignField: '_id',
              as: 'location'
            }
          },
          {
            $unwind: {
              path: '$location',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: '$location.title',
              count: {
                $sum: 1
              }
            }
          },
          {
            $project: {
              _id: 0,
              title: '$_id',
              count: 1
            }
          }
        ]).allowDiskUse(true),
        IPAddress.aggregate([
          {
            $lookup: {
              from: 'branches',
              localField: 'branch',
              foreignField: '_id',
              as: 'branch'
            }
          },
          {
            $unwind: {
              path: '$branch',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: '$branch.title',
              count: {
                $sum: 1
              }
            }
          },
          {
            $project: {
              _id: 0,
              title: '$_id',
              count: 1
            }
          }
        ]).allowDiskUse(true),
        IPAddress.aggregate([
          {
            $lookup: {
              from: 'enterprises',
              localField: 'enterprise',
              foreignField: '_id',
              as: 'enterprise'
            }
          },
          {
            $unwind: {
              path: '$enterprise',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $group: {
              _id: '$enterprise.title',
              count: {
                $sum: 1
              }
            }
          },
          {
            $project: {
              _id: 0,
              title: '$_id',
              count: 1
            }
          }
        ]).allowDiskUse(true)
      ]);

      callback({
        response: {
          ...statistic[0],
          channels,
          companies,
          branches,
          enterprises,
          locations,
          units,
          vpns,

          barUnits,
          barLocations,
          barBranches,
          barEnterprises
        }
      });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const request = async (payload, callback) => {
    const startOfYear = dayjs().startOf('year');
    const endOfYear = dayjs().endOf('year');

    try {
      const [requests, companies, branches, enterprises, departments, locations, positions, units] =
        await Promise.all([
          Request.countDocuments(),
          Сompany.countDocuments(),
          Branch.countDocuments(),
          Enterprise.countDocuments(),
          Department.countDocuments(),
          Location.countDocuments(),
          Position.countDocuments(),
          Unit.countDocuments()
        ]);

      const closed = await Request.countDocuments({ closed: { $ne: null } });
      const opened = await Request.countDocuments({ closed: { $eq: null } });

      const yearchar = await Request.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startOfYear),
              $lte: new Date(endOfYear)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        {
          $addFields: {
            month: '$_id'
          }
        },
        {
          $project: {
            _id: 0,
            month: 1,
            count: 1
          }
        },
        { $sort: { month: 1 } }
      ]);

      const startOfMonth = dayjs().startOf('month');
      const endOfMonth = dayjs().endOf('month');

      const monthchar = await Request.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startOfMonth),
              $lte: new Date(endOfMonth)
            }
          }
        },
        {
          $group: {
            _id: { $dayOfMonth: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        {
          $addFields: {
            day: '$_id',
            date: '$createdAt'
          }
        },
        {
          $project: {
            _id: 0,
            day: 1,
            date: 1,
            count: 1
          }
        },
        { $sort: { day: 1 } }
      ]);

      const currentDate = dayjs();
      const daysInMonth = currentDate.daysInMonth();
      const datesOfMonth = Array.from({ length: daysInMonth }, (_, index) => {
        return { date: currentDate.date(index + 1).format('DD.MM.YY (dd)'), day: index + 1 };
      });

      const dd = datesOfMonth.map(({ day, date }) => {
        return { day, date, count: monthchar.find((item) => item.day === day)?.count || 0 };
      });

      const startOfWeek = dayjs().startOf('week').startOf('day');
      const endOfWeek = dayjs().endOf('week').endOf('day');

      const weekchar = await Request.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startOfWeek),
              $lte: new Date(endOfWeek)
            }
          }
        },
        {
          $group: {
            _id: { $dayOfWeek: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        {
          $addFields: {
            day: '$_id'
          }
        },
        {
          $project: {
            _id: 0,
            day: 1,
            count: 1
          }
        },
        { $sort: { day: 1 } }
      ]);

      callback({
        response: {
          opened,
          closed,
          requests,
          yearchar,
          monthchar: dd,
          weekchar,
          companies,
          branches,
          enterprises,
          departments,
          locations,
          positions,
          units
        }
      });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const inspector = async (payload, callback) => {
    try {
      const count = await Inspector.countDocuments();

      const warnings = await Inspector.aggregate([
        {
          $addFields: {
            useraccount: {
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
                        $in: ['$$item.Name', [...EXCEPTION_USERACCOUNTS]]
                      }
                    }
                  ]
                }
              }
            },

            share: {
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

            warnings: {
              useraccount: {
                $cond: {
                  if: {
                    $and: [
                      { $gt: [{ $size: { $ifNull: ['$useraccount', []] } }, 0] },

                      {
                        $gt: [
                          {
                            $size: {
                              $setIntersection: [
                                { $ifNull: ['$useraccount.Name', []] },
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
              },

              product: {
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
              },

              share: {
                $cond: {
                  if: {
                    $and: [
                      { $gt: [{ $size: { $ifNull: ['$share', []] } }, 0] },
                      {
                        $gt: [
                          {
                            $size: {
                              $setIntersection: [{ $ifNull: ['$share.Type', []] }, [0]]
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
          }
        },
        {
          $group: {
            _id: null,

            useraccount: {
              $sum: {
                $cond: [
                  {
                    $eq: ['$warnings.useraccount', true]
                  },
                  1,
                  0
                ]
              }
            },

            product: {
              $sum: {
                $cond: [
                  {
                    $eq: ['$warnings.product', true]
                  },
                  1,
                  0
                ]
              }
            },

            share: {
              $sum: {
                $cond: [
                  {
                    $eq: ['$warnings.share', true]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },

        {
          $project: {
            _id: 0,
            useraccount: 1,
            product: 1,
            share: 1
          }
        }
      ]).allowDiskUse(true);

      const days = await Inspector.aggregate([
        {
          $bucket: {
            groupBy: '$updatedAt',
            boundaries: [
              new Date(new Date().valueOf() - 365 * (1000 * 60 * 60 * 24)),
              new Date(new Date().valueOf() - 90 * (1000 * 60 * 60 * 24)),
              new Date(new Date().valueOf() - 60 * (1000 * 60 * 60 * 24)),
              new Date(new Date().valueOf() - 30 * (1000 * 60 * 60 * 24)),
              new Date(new Date().valueOf() - 15 * (1000 * 60 * 60 * 24)),
              new Date(new Date().valueOf() - 7 * (1000 * 60 * 60 * 24)),
              new Date(new Date().valueOf() - 1 * (1000 * 60 * 60 * 24))
            ],
            default: new Date(new Date().valueOf() - 366 * (1000 * 60 * 60 * 24)),
            output: {
              count: { $sum: 1 }
            }
          }
        },
        {
          $addFields: {
            days: {
              $divide: [{ $subtract: [new Date(), '$_id'] }, 1000 * 60 * 60 * 24]
            }
          }
        },
        {
          $project: {
            _id: 0,
            days: 1,
            count: 1
          }
        },
        {
          $sort: {
            days: 1
          }
        }
      ]).allowDiskUse(true);

      callback({
        response: {
          count,
          ...warnings[0],
          days
        }
      });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const dashboard = async (payload, callback) => {
    try {
      const [
        users,
        inspectors,
        requests,
        ipaddress,
        channels,
        companies,
        branches,
        enterprises,
        departments,
        positions,
        locations,
        units,
        vpns
      ] = await Promise.all([
        User.countDocuments(),
        Inspector.countDocuments(),
        Request.countDocuments(),
        IPAddress.countDocuments(),
        Channel.countDocuments(),
        Сompany.countDocuments(),
        Branch.countDocuments(),
        Enterprise.countDocuments(),
        Department.countDocuments(),
        Position.countDocuments(),
        Location.countDocuments(),
        Unit.countDocuments(),
        VPN.countDocuments()
      ]);

      callback({
        response: {
          users,
          inspectors,
          requests,
          ipaddress,
          channels,
          companies,
          branches,
          enterprises,
          departments,
          positions,
          locations,
          units,
          vpns
        }
      });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('statistic:network', network);
  socket.on('statistic:request', request);
  socket.on('statistic:inspector', inspector);
  socket.on('statistic:dashboard', dashboard);
};
