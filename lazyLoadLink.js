/**
 * 懒加载管理器
 * 对于https://assets.youdata.com/libs/flowSDK/flowApproveSDK.js这种资源的懒加载管理器
 */
const lazyLoadLinkManager = {
  tag: 'youdata-assets',
  acceptFileType: ['js', 'css'],
  /**
   * @typedef {{src: string, type: string, status: 'init' | 'success' | 'failed' | 'fetching'}} AssetItem
   * @type {{[key: string]: AssetItem}}
   */
  assetsMap: {},
  register(name, src, type) {
    if (!type) {
      const suffixName = src.substr(src.lastIndexOf('.') + 1);
      type = suffixName;
    }
    if (!this.acceptFileType.includes(type)) {
      return false;
    }
    if (!this.assetsMap[name]) {
      this.assetsMap[name] = {
        src,
        type,
        status: 'init',
      };
    }
    return true;
  },
  _genId(name) {
    return this.tag + '-' + name;
  },
  _loadError(name, msg) {
    let text = name ? `资源名称：【${name}】 ` : '';
    return new Error(`${text}${msg || '资源加载失败'}，`);
  },
  assetValue(name, key, value) {
    let isSet = arguments.length > 2;
    if (isSet) {
      if (this.assetsMap[name]) {
        this.assetsMap[name][key] = value;
      }
    } else {
      return this.assetsMap[name] ? this.assetsMap[name][key] : undefined;
    }
  },
  load(name, options = {force: false}) {
    if (!this.assetsMap[name]) {
      return Promise.reject(this._loadError(undefined, '资源未注册'));
    }
    let {type, src, status} = this.assetsMap[name];
    if (status === 'success' || status === 'fetching') {
      return Promise.resolve({result: 'ok', status});
    }
    return new Promise((resolve, reject) => {
      // 处理css
      if (type === 'css') {
        let element = document.createElement('link');
        element.type = 'text/css';
        element.rel = 'stylesheet';
        element.href = src;
        element.id = this._genId(name);
        this.assetValue(name, 'status', 'fetching');

        document.head.appendChild(element);

        element.onload = () => {
          this.assetValue(name, 'status', 'success');
          resolve({result: 'ok', status});
        };
        element.onerror = () => {
          this.assetValue(name, 'status', 'error');
          reject(this._loadError(name, '资源执行失败'));
        };
      } else {
        this.assetValue(name, 'status', 'fetching');
        fetchSource({url: src}).then((script) => {
          try {
            runCode2Function(script);
          } catch (error) {
            let execError = {
              from: 'execScript',
              error,
            };
            throw execError;
          }
          this.assetValue(name, 'status', 'success');
          resolve({result: 'ok', status});
        }).catch((errObj) => {
          this.assetValue(name, 'status', 'error');
          let fromExecuteScript = errObj && typeof errObj === 'object' && errObj.from === 'execScript';
          if (fromExecuteScript) {
            reject(this._loadError(name, '资源执行错误-' + errObj.error));
          } else {
            reject(this._loadError(name, '资源加载错误-' + errObj));
          }
        });
      }
    });
  },
};

function fetchSource({url, options}) {
  return fetch(url, options).then(res => res.text());
}
function runCode2Function(script) {
  const execScript = `with (window) {;${script}\n}`;
  // eslint-disable-next-line no-new-func
  let code = new Function('window', execScript).bind(window);
  // run code with sandbox
  code(window);
}

export default lazyLoadLinkManager;
