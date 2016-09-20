'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _books = require('./books');

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BooksStore = function BooksStore() {
    var _this = this;

    _classCallCheck(this, BooksStore);

    this.search = '';

    this.setSearch = function (value) {
        return _this.search = value;
    };

    this.books = [];

    this.runSearch = function () {
        return _this.books = _books2.default.filter(function (book) {
            return !_this.search || new RegExp(_this.search, 'i').test(book.title);
        });
    };

    (function () {
        var currentSearch = _this.search;

        console.log('Changed to', currentSearch || '<empty>');
    });
};

//----------------------------------------------------------------------------------------------------

var Store = new BooksStore();

var Main = function (_Component) {
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
}(_react.Component);

exports.default = Main;

/*

NOTES

- autorun
- reducing edit field boilerplate
- transactions
- perf


*/