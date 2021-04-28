const codes = {
  // 1xx
  200: {
    message: "OK",
    method: "ok"
  },
  400: {
    message: "Bad Request",
    method: "bad"
  },
  401: {
    message: "Unauthorized",
    method: "notAuth"
  },
  403: {
    message: "Forbidden",
    method: "forbidden"
  },
  404: {
    message: "Not Found",
    method: "notFound"
  },
  408: {
    message: "Request Timeout",
    method: "timeout"
  },
  429: {
    message: "Too Many Requests",
    method: "limited"
  },
  500: {
    message: "Internal Server Error",
    method: "error"
  },
  503: {
    message: "Service Unavailable",
    method: "noService"
  },
  507: {
    message: "Insufficient Storage",
    method: "noStorage"
  }
}

export default function resCodes() {
  return (req, res, next) => {
    function init(cb) {
      Object.keys(codes).forEach(i => {
        Object.defineProperty(res, codes[i].method, {
          enumerable: true,
          configurable: true,
          value: function(data, msg) {
            try {
              res.statusMessage = codes[i].message +" : "+msg || codes[i].message
              res.status(i).json(data || null)
            } catch(err) {
              next(err)
            }
          },
          writable: true
        });
      })
      cb();
    }
    init(() => {
      next();
    })
  }
}