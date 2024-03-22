import './index.pcss';

import Uploader from './uploader';
import { make, moveCaretToTheEnd, isEmpty } from './utils/dom';
import { getExtensionFromFileName } from './utils/file';
import { IconFile } from '@codexteam/icons';

const LOADER_TIMEOUT = 500;

const ICON_SVG = {
  jpg: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<mask id="path-1-inside-1_6670_28050" fill="white">',
    '<rect x="4" y="4" width="16" height="16" rx="1"/>',
    '</mask>',
    '<rect x="4" y="4" width="16" height="16" rx="1" stroke="#15AA55" stroke-width="3" mask="url(#path-1-inside-1_6670_28050)"/>',
    '<circle cx="16" cy="8" r="1" fill="#15AA55"/>',
    '<path d="M11.0251 14.4039L11.512 13.8335L11.0251 14.4039C11.343 14.6752 11.8109 14.6752 12.1288 14.4039L14.7471 12.1691C14.8461 12.0846 14.9935 12.0902 15.0858 12.1821L16.6764 13.7661C16.7235 13.813 16.75 13.8767 16.75 13.9432V16.5C16.75 16.6381 16.6381 16.75 16.5 16.75H7.5C7.36193 16.75 7.25 16.6381 7.25 16.5V15.0723C7.25 14.9991 7.28205 14.9297 7.3377 14.8822L9.29924 13.2079C9.39273 13.1281 9.53035 13.1281 9.62384 13.2079L11.0251 14.4039Z" stroke="#15AA55" stroke-width="1.5"/>',
    '</svg>',
  ].join(''),
  etc: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<path d="M5.75 5C5.75 4.86193 5.86193 4.75 6 4.75H14.5858C14.6521 4.75 14.7157 4.77634 14.7626 4.82322L15.2929 4.29289L14.7626 4.82322L18.1768 8.23744C18.2237 8.28432 18.25 8.34791 18.25 8.41421V19C18.25 19.1381 18.1381 19.25 18 19.25H6C5.86193 19.25 5.75 19.1381 5.75 19V5Z" stroke="#3D3D3D" stroke-width="1.5"/>',
    '<path d="M14 5V8.7C14 8.86569 14.1343 9 14.3 9H18" stroke="#3D3D3D" stroke-width="1.5" stroke-linecap="round"/>',
    '</svg>',
  ].join(''),
  pdf: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<mask id="path-1-inside-1_6670_28091" fill="white">',
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2916 15.4061L12.8222 9.84993L14.1068 7.53757C14.9885 5.95044 13.8409 4 12.0253 4C10.2097 4 9.06203 5.95044 9.94377 7.53757L11.2003 9.79929L8.70908 15.4045L5.39154 15.442C3.2729 15.466 1.9642 17.7626 3.02359 19.5975C4.08298 21.4324 6.72624 21.4474 7.8063 19.6245L9.3614 17H14.5004L16.0555 19.6245C17.1356 21.4474 19.7788 21.4324 20.8382 19.5975C21.8976 17.7626 20.5889 15.466 18.4703 15.442L15.2916 15.4061Z"/>',
    '</mask>',
    '<path d="M15.2916 15.4061L13.9209 16.0153L14.3119 16.8951L15.2746 16.906L15.2916 15.4061ZM12.8222 9.84993L11.5109 9.12146L11.1476 9.77547L11.4514 10.4591L12.8222 9.84993ZM14.1068 7.53757L15.418 8.26603V8.26603L14.1068 7.53757ZM9.94377 7.53757L8.63253 8.26603L9.94377 7.53757ZM11.2003 9.79929L12.571 10.4085L12.8748 9.72482L12.5115 9.07082L11.2003 9.79929ZM8.70908 15.4045L8.72604 16.9045L9.68878 16.8936L10.0798 16.0137L8.70908 15.4045ZM5.39154 15.442L5.37459 13.9421H5.37459L5.39154 15.442ZM3.02359 19.5975L4.32263 18.8475H4.32263L3.02359 19.5975ZM7.8063 19.6245L9.09678 20.3892L7.8063 19.6245ZM9.3614 17V15.5H8.50664L8.07092 16.2354L9.3614 17ZM14.5004 17L15.7909 16.2354L15.3552 15.5H14.5004V17ZM16.0555 19.6245L14.765 20.3892L16.0555 19.6245ZM20.8382 19.5975L19.5392 18.8475L19.5392 18.8475L20.8382 19.5975ZM18.4703 15.442L18.4533 16.9419L18.4703 15.442ZM16.6623 14.7969L14.1929 9.24071L11.4514 10.4591L13.9209 16.0153L16.6623 14.7969ZM14.1334 10.5784L15.418 8.26603L12.7956 6.8091L11.5109 9.12146L14.1334 10.5784ZM15.418 8.26603C16.8552 5.67911 14.9846 2.5 12.0253 2.5V5.5C12.6972 5.5 13.1219 6.22178 12.7956 6.8091L15.418 8.26603ZM12.0253 2.5C9.06595 2.5 7.19535 5.67911 8.63253 8.26603L11.255 6.8091C10.9287 6.22178 11.3534 5.5 12.0253 5.5V2.5ZM8.63253 8.26603L9.88904 10.5278L12.5115 9.07082L11.255 6.8091L8.63253 8.26603ZM9.82956 9.19009L7.33836 14.7953L10.0798 16.0137L12.571 10.4085L9.82956 9.19009ZM8.69213 13.9046L5.37459 13.9421L5.4085 16.9419L8.72604 16.9045L8.69213 13.9046ZM5.37459 13.9421C2.10884 13.9791 0.091573 17.5191 1.72455 20.3475L4.32263 18.8475C3.83683 18.0061 4.43695 16.9529 5.4085 16.9419L5.37459 13.9421ZM1.72455 20.3475C3.35753 23.1759 7.43194 23.1989 9.09678 20.3892L6.51583 18.8599C6.02054 19.6958 4.80843 19.6889 4.32263 18.8475L1.72455 20.3475ZM9.09678 20.3892L10.6519 17.7646L8.07092 16.2354L6.51583 18.8599L9.09678 20.3892ZM9.3614 18.5H14.5004V15.5H9.3614V18.5ZM17.346 18.8599L15.7909 16.2354L13.2099 17.7646L14.765 20.3892L17.346 18.8599ZM19.5392 18.8475C19.0534 19.6889 17.8413 19.6958 17.346 18.8599L14.765 20.3892C16.4299 23.1989 20.5043 23.1759 22.1373 20.3475L19.5392 18.8475ZM18.4533 16.9419C19.4249 16.9529 20.025 18.0061 19.5392 18.8475L22.1373 20.3475C23.7702 17.5191 21.753 13.9791 18.4872 13.9421L18.4533 16.9419ZM15.2746 16.906L18.4533 16.9419L18.4872 13.9421L15.3086 13.9062L15.2746 16.906Z" fill="#EA1D22" mask="url(#path-1-inside-1_6670_28091)"/>',
    '</svg>',
  ].join(''),
  ppt: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<path d="M14 5H19" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M14 7.5H19" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M14 10H19" stroke="#FF9900" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M19 12.75C19.0721 12.75 19.1286 12.7793 19.1613 12.8134C19.1901 12.8433 19.1983 12.8718 19.1941 12.9054C18.749 16.4818 15.6972 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 8.30279 7.51816 5.25097 11.0946 4.80591C11.1282 4.80173 11.1567 4.80988 11.1866 4.8387C11.2207 4.87144 11.25 4.92793 11.25 5V11C11.25 11.9665 12.0335 12.75 13 12.75H19Z" stroke="#FF9900" stroke-width="1.5"/>',
    '</svg>',
  ].join(''),
  xls: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<path d="M4.99805 18L15.998 6" stroke="#15AA55" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M4.49998 6.5L12 14" stroke="#15AA55" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M13.998 14H18.998" stroke="#15AA55" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M13.998 16.5H18.998" stroke="#15AA55" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M13.998 19H18.998" stroke="#15AA55" stroke-width="1.5" stroke-linecap="round"/>',
    '</svg>',
  ],
  txt: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<path d="M5.75 5C5.75 4.86193 5.86193 4.75 6 4.75H14.5858C14.6521 4.75 14.7157 4.77634 14.7626 4.82322L15.2929 4.29289L14.7626 4.82322L18.1768 8.23744C18.2237 8.28432 18.25 8.34791 18.25 8.41421V19C18.25 19.1381 18.1381 19.25 18 19.25H6C5.86193 19.25 5.75 19.1381 5.75 19V5Z" stroke="#595BFD" stroke-width="1.5"/>',
    '<path d="M14 5V8.7C14 8.86569 14.1343 9 14.3 9H18" stroke="#595BFD" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M8 9H11" stroke="#595BFD" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M8 12H15" stroke="#595BFD" stroke-width="1.5" stroke-linecap="round"/>',
    '<path d="M8 15H15" stroke="#595BFD" stroke-width="1.5" stroke-linecap="round"/>',
    '</svg>',
  ].join(''),
  zip: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<path d="M3.75 5.5C3.75 5.36193 3.86193 5.25 4 5.25H9.9C9.99233 5.25 10.0771 5.30089 10.1206 5.38235L11.2535 7.50662L11.9153 7.15368L11.2535 7.50662C11.436 7.84877 11.7922 8.0625 12.18 8.0625H20C20.1381 8.0625 20.25 8.17443 20.25 8.3125V18.5C20.25 18.6381 20.1381 18.75 20 18.75H4C3.86193 18.75 3.75 18.6381 3.75 18.5V5.5Z" stroke="#FFC700" stroke-width="1.5"/>',
    '</svg>',
  ].join(''),
  mp4: [
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
    '<path d="M18.4987 12.8651L8.49978 18.6346C7.83312 19.0193 7 18.5381 7 17.7684L7 6.23127C7 5.46164 7.83299 4.9805 8.49966 5.36505L18.4986 11.1327C19.1656 11.5175 19.1657 12.4802 18.4987 12.8651Z" stroke="#8B8CFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    '</svg>',
  ].join(''),
};

/**
 * @typedef {object} AttachesToolData
 * @description Attaches Tool's output data format
 * @property {AttachesFileData} file - object containing information about the file
 * @property {string} title - file's title
 */

/**
 * @typedef {object} AttachesFileData
 * @description Attaches Tool's file format
 * @property {string} [url] - file's upload url
 * @property {string} [size] - file's size
 * @property {string} [extension] - file's extension
 * @property {string} [name] - file's name
 */

/**
 * @typedef {object} FileData
 * @description Attaches Tool's response from backend. Could contain any data.
 * @property {string} [url] - file's url
 * @property {string} [name] - file's name with extension
 * @property {string} [extension] - file's extension
 */

/**
 * @typedef {object} UploadResponseFormat
 * @description This format expected from backend on file upload
 * @property {number} success  - 1 for successful uploading, 0 for failure
 * @property {FileData} file - backend response with uploaded file data.
 */

/**
 * @typedef {object} AttachesToolConfig
 * @description Config supported by Tool
 * @property {string} endpoint - file upload url
 * @property {string} field - field name for uploaded file
 * @property {string} types - available mime-types
 * @property {string} errorMessage - message to show if file uploading failed
 * @property {object} [uploader] - optional custom uploader
 * @property {function(File): Promise.<UploadResponseFormat>} [uploader.uploadByFile] - custom method that upload file and returns response
 */

/**
 * @typedef {object} EditorAPI
 * @property {object} styles - Styles API {@link https://github.com/codex-team/editor.js/blob/next/types/api/styles.d.ts}
 * @property {object} i18n - Internationalization API {@link https://github.com/codex-team/editor.js/blob/next/types/api/i18n.d.ts}
 * @property {object} notifier - Notifier API {@link https://github.com/codex-team/editor.js/blob/next/types/api/notifier.d.ts}
 */

/**
 * @class AttachesTool
 * @classdesc AttachesTool for Editor.js 2.0
 */
export default class AttachesTool {
  /**
   * @param {object} options - tool constructor options
   * @param {AttachesToolData} [options.data] - previously saved data
   * @param {AttachesToolConfig} options.config - user defined config
   * @param {EditorAPI} options.api - Editor.js API
   * @param {boolean} options.readOnly - flag indicates whether the Read-Only mode enabled or not
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    this.nodes = {
      wrapper: null,
      button: null,
      title: null,
    };

    this._data = {
      file: {},
      title: '',
    };

    this.config = {
      endpoint: config.endpoint || '',
      field: config.field || 'file',
      types: config.types || '*',
      buttonText: config.buttonText || 'Select file to upload',
      errorMessage: config.errorMessage || 'File upload failed',
      uploader: config.uploader || undefined,
      additionalRequestHeaders: config.additionalRequestHeaders || {},
      titleEditable: config.titleEditable === undefined ? true : config.titleEditable,
    };

    if (data !== undefined && !isEmpty(data)) {
      this.data = data;
    }

    /**
     * Module for files uploading
     */
    this.uploader = new Uploader({
      config: this.config,
      onUpload: (response) => this.onUpload(response),
      onError: (error) => this.uploadingFailed(error),
    });

    this.enableFileUpload = this.enableFileUpload.bind(this);
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: IconFile,
      title: 'Attachment',
    };
  }

  /**
   * Returns true to notify core that read-only is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Tool's CSS classes
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      apiButton: this.api.styles.button,
      loader: this.api.styles.loader,
      /**
       * Tool's classes
       */
      wrapper: 'cdx-attaches',
      wrapperWithFile: 'cdx-attaches--with-file',
      wrapperLoading: 'cdx-attaches--loading',
      button: 'cdx-attaches__button',
      title: 'cdx-attaches__title',
      size: 'cdx-attaches__size',
      downloadButton: 'cdx-attaches__download-button',
      fileInfo: 'cdx-attaches__file-info',
      fileIcon: 'cdx-attaches__file-icon',
    };
  }

  /**
   * Possible files' extension icon name
   *
   * @returns {object}
   */
  get EXTENSIONS() {
    return {
      doc: 'txt',
      docx: 'txt',
      odt: 'txt',
      pdf: 'pdf',
      rtf: 'txt',
      tex: 'txt',
      txt: 'txt',
      pptx: 'ppt',
      ppt: 'ppt',
      mp3: 'mp4',
      mp4: 'mp4',
      xls: 'xls',
      xlsx: 'xls',
      html: 'etc',
      htm: 'etc',
      png: 'jpg',
      jpg: 'jpg',
      jpeg: 'jpg',
      gif: 'jpg',
      zip: 'zip',
      rar: 'zip',
      exe: 'etc',
      svg: 'jpg',
      key: 'etc',
      sketch: 'jpg',
      ai: 'jpg',
      psd: 'jpg',
      dmg: 'etc',
      json: 'etc',
      csv: 'xls',
    };
  };

  /**
   * Validate block data:
   * - check for emptiness
   *
   * @param {AttachesToolData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(savedData) {
    if (isEmpty(savedData.file)) {
      return false;
    }

    return true;
  }

  /**
   * Return Block data
   *
   * @param {HTMLElement} toolsContent - block main element returned by the render method
   * @returns {AttachesToolData}
   */
  save(toolsContent) {
    /**
     * If file was uploaded
     */
    if (this.pluginHasData()) {
      const titleElement = toolsContent.querySelector(`.${this.CSS.title}`);

      if (titleElement) {
        Object.assign(this.data, {
          title: titleElement.innerHTML,
        });
      }
    }

    return this.data;
  }

  /**
   * Renders Block content
   *
   * @returns {HTMLDivElement}
   */
  render() {
    const holder = make('div', this.CSS.baseClass);

    this.nodes.wrapper = make('div', this.CSS.wrapper);

    if (this.pluginHasData()) {
      this.showFileData();
    } else {
      this.prepareUploadButton();
    }

    holder.appendChild(this.nodes.wrapper);

    return holder;
  }

  /**
   * Prepares button for file uploading
   */
  prepareUploadButton() {
    this.nodes.button = make('div', [this.CSS.apiButton, this.CSS.button]);
    this.nodes.button.innerHTML = `${IconFile} ${this.config.buttonText}`;

    if (!this.readOnly) {
      this.nodes.button.addEventListener('click', this.enableFileUpload);
    }

    this.nodes.wrapper.appendChild(this.nodes.button);
  }

  /**
   * Fires after clicks on the Toolbox AttachesTool Icon
   * Initiates click on the Select File button
   *
   * @public
   */
  appendCallback() {
    this.nodes.button.click();
  }

  /**
   * Specify paste substitutes
   *
   * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
   * @returns {{tags: string[], patterns: object<string, RegExp>, files: {extensions: string[], mimeTypes: string[]}}}
   */
  static get pasteConfig() {
    return {
      /**
       * Paste HTML into Editor
       */
      tags: [],

      /**
       * Paste URL of file into the Editor
       */
      patterns: {},

      /**
       * Drag n drop file from into the Editor
       */
      files: {
        mimeTypes: [ 'application/*' ],
      },
    };
  }

  /**
   * Specify paste handlers
   *
   * @public
   * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
   * @param {CustomEvent} event - editor.js custom paste event
   *                              {@link https://github.com/codex-team/editor.js/blob/master/types/tools/paste-events.d.ts}
   * @returns {void}
   */
  async onPaste(event) {
    switch (event.type) {
      case 'file': {
        const file = event.detail.file;

        this.uploader.uploadByFile(file, {
          onPreview: () => {
            this.nodes.wrapper.classList.add(this.CSS.wrapperLoading, this.CSS.loader);
          },
        });
        break;
      }
    }
  }

  /**
   * Checks if any of Tool's fields have data
   *
   * @returns {boolean}
   */
  pluginHasData() {
    return this.data.title !== '' || Object.values(this.data.file).some(item => item !== undefined);
  }

  /**
   * Allow to upload files on button click
   */
  enableFileUpload() {
    this.uploader.uploadSelectedFile({
      onPreview: () => {
        this.nodes.wrapper.classList.add(this.CSS.wrapperLoading, this.CSS.loader);
      },
    });
  }

  /**
   * File uploading callback
   *
   * @param {UploadResponseFormat} response - server returned data
   */
  onUpload(response) {
    const body = response;

    try {
      if (body.success && body.file !== undefined && !isEmpty(body.file)) {
        this.data = {
          file: body.file,
          title: body.file.title || '',
        };

        this.nodes.button.remove();
        this.showFileData();

        moveCaretToTheEnd(this.nodes.title);

        this.removeLoader();
      } else {
        this.uploadingFailed(this.config.errorMessage);
      }
    } catch (error) {
      console.error('Attaches tool error:', error);
      this.uploadingFailed(this.config.errorMessage);
    }

    /**
     * Trigger onChange function when upload finished
     */
    this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex()).dispatchChange();
  }

  /**
   * Handles uploaded file's extension and appends corresponding icon
   *
   * @param {object<string, string | number | boolean>} file - uploaded file data got from the backend. Could contain any fields.
   */
  appendFileIcon(file) {
    const filename = file.fileName || file.name || file.title;
    const extensionFileName = getExtensionFromFileName(filename).toLowerCase();
    const extension =
      filename === extensionFileName ? file.extension : extensionFileName;
    const extensionIcon = this.EXTENSIONS[extension] || 'etc';

    const wrapper = make('div', [this.CSS.fileIcon, extensionIcon]);

    wrapper.innerHTML = ICON_SVG[extensionIcon];

    this.nodes.wrapper.appendChild(wrapper);
  }

  /**
   * Removes tool's loader
   */
  removeLoader() {
    setTimeout(() => this.nodes.wrapper.classList.remove(this.CSS.wrapperLoading, this.CSS.loader), LOADER_TIMEOUT);
  }

  /**
   * If upload is successful, show info about the file
   */
  showFileData() {
    this.nodes.wrapper.classList.add(this.CSS.wrapperWithFile);

    const { file, title } = this.data;

    this.appendFileIcon(file);

    const fileInfo = make('div', this.CSS.fileInfo);

    this.nodes.title = make('div', this.CSS.title, {
      contentEditable: this.readOnly === false && this.config.titleEditable === true,
    });

    this.nodes.title.dataset.placeholder = this.api.i18n.t('File title');
    this.nodes.title.textContent = title || '';
    fileInfo.appendChild(this.nodes.title);

    if (file.size) {
      let sizePrefix;
      let formattedSize;
      const fileSize = make('div', this.CSS.size);

      if (Math.log10(+file.size) >= 6) {
        sizePrefix = 'MB';
        formattedSize = file.size / Math.pow(2, 20);
      } else {
        sizePrefix = 'KB';
        formattedSize = file.size / Math.pow(2, 10);
      }

      fileSize.textContent = formattedSize.toFixed(1);
      fileSize.setAttribute('data-size', sizePrefix);
      fileInfo.appendChild(fileSize);
    }

    this.nodes.wrapper.appendChild(fileInfo);

    if (file.url !== undefined) {
      const downloadIcon = make('a', this.CSS.downloadButton, {
        innerHTML: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 12V14.25C3.75 14.6642 4.08579 15 4.5 15H13.5C13.9142 15 14.25 14.6642 14.25 14.25V12" stroke="#6F6F6F" stroke-width="1.125" stroke-linecap="round"/><path d="M9.18862 3.41813L9.18862 12.375M9.18862 12.375L12.6172 8.95262M9.18862 12.375L5.76005 8.95261" stroke="#6F6F6F" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
        href: file.url,
        target: '_blank',
        rel: 'nofollow noindex noreferrer',
      });

      this.nodes.wrapper.appendChild(downloadIcon);
    }
  }

  /**
   * If file uploading failed, remove loader and show notification
   *
   * @param {string} errorMessage -  error message
   */
  uploadingFailed(errorMessage) {
    this.api.notifier.show({
      message: errorMessage,
      style: 'error',
    });

    this.removeLoader();
  }

  /**
   * Return Attaches Tool's data
   *
   * @returns {AttachesToolData}
   */
  get data() {
    return this._data;
  }

  /**
   * Stores all Tool's data
   *
   * @param {AttachesToolData} data - data to set
   */
  set data({ file, title }) {
    this._data = {
      file,
      title,
    };
  }
}
