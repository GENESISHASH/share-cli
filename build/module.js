(function() {
  var aws, conf, e, file, iced, log, new_filename, opt, r, s3, _, __iced_deferrals, __iced_k, __iced_k_noop,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {
      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) {
          return this.continuation(this.ret);
        }
      };

      _Class.prototype.defer = function(defer_params) {
        ++this.count;
        return (function(_this) {
          return function() {
            var inner_params, _ref;
            inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (defer_params != null) {
              if ((_ref = defer_params.assign_fn) != null) {
                _ref.apply(null, inner_params);
              }
            }
            return _this._fulfill();
          };
        })(this);
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  log = function() {
    var x;
    x = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    try {
      return console.log.apply(console, x);
    } catch (_error) {}
  };

  _ = require('wegweg')({
    globals: true,
    shelljs: true
  });

  if (!_.arg('file')) {
    throw new Error('`--file` required');
  }

  file = _.resolve(_.arg('file'));

  if (!_.exists(file)) {
    throw new Error('File noexists');
  }

  conf = require(__dirname + '/../config');

  aws = require('aws-sdk');

  aws.config.update({
    accessKeyId: conf.ACCESS,
    secretAccessKey: conf.SECRET
  });

  s3 = new aws.S3();

  new_filename = (function(_this) {
    return function() {
      var extension, orig;
      orig = _.base(file);
      orig = orig.split('.');
      extension = orig.pop();
      return _.uuid() + '.' + extension;
    };
  })(this)();

  opt = {
    Bucket: conf.BUCKET,
    Key: new_filename,
    ContentType: _.mime(new_filename),
    ACL: 'public-read',
    Body: require('fs').readFileSync(file)
  };

  (function(_this) {
    return (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        filename: "/Users/douglaslauer/www/share-cli/src/module.iced"
      });
      s3.upload(opt, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            e = arguments[0];
            return r = arguments[1];
          };
        })(),
        lineno: 43
      }));
      __iced_deferrals._fulfill();
    });
  })(this)((function(_this) {
    return function() {
      if (e) {
        throw e;
      }
      log(r.Location);
      return exit(0);
    };
  })(this));

}).call(this);
