'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class3;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _books = require('./books');

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var BooksStore = (_class = function BooksStore() {
    var _this = this;

    _classCallCheck(this, BooksStore);

    _initDefineProp(this, 'search', _descriptor, this);

    _initDefineProp(this, 'books', _descriptor2, this);

    _initDefineProp(this, 'runSearch', _descriptor3, this);

    (0, _mobx.autorun)(function () {
        var currentSearch = _this.search;

        console.log('Changed to', currentSearch || '<empty>');
    });
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'search', [_mobx.observable, editable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'books', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'runSearch', [_mobx.action], {
    enumerable: true,
    initializer: function initializer() {
        var _this2 = this;

        return function () {
            return _this2.books = _books2.default.filter(function (book) {
                return !_this2.search || new RegExp(_this2.search, 'i').test(book.title);
            });
        };
    }
})), _class);

//----------------------------------------------------------------------------------------------------

var Store = new BooksStore();

var Main = (0, _mobxReact.observer)(_class3 = function (_Component) {
    _inherits(Main, _Component);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', { type: 'text', value: Store.search, onChange: function onChange(evt) {
                        return Store.setSearch(evt.target.value);
                    } }),
                _react2.default.createElement(
                    'button',
                    { onClick: Store.runSearch },
                    'Search'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'ul',
                    null,
                    Store.books.map(function (book) {
                        return _react2.default.createElement(
                            'li',
                            { key: book._id },
                            book.title
                        );
                    })
                )
            );
        }
    }]);

    return Main;
}(_react.Component)) || _class3;

exports.default = Main;

/*

NOTES

- autorun
- reducing edit field boilerplate
- transactions
- perf


*/