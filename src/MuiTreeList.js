'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _ListItem = require('material-ui/List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _expandMore = require('material-ui/svg-icons/navigation/expand-more');

var _expandMore2 = _interopRequireDefault(_expandMore);

var _expandLess = require('material-ui/svg-icons/navigation/expand-less');

var _expandLess2 = _interopRequireDefault(_expandLess);

var _folder = require('material-ui/svg-icons/file/folder');

var _folder2 = _interopRequireDefault(_folder);

var _insertDriveFile = require('material-ui/svg-icons/editor/insert-drive-file');

var _insertDriveFile2 = _interopRequireDefault(_insertDriveFile);

var _reactSortableHoc = require('react-sortable-hoc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragHandle = (0, _reactSortableHoc.SortableHandle)(function () {
    return _react2.default.createElement(
        'span',
        null,
        '::'
    );
});

var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref) {
    var items = _ref.items,
        searchMode = _ref.searchMode,
        expandedListItems = _ref.expandedListItems,
        useFolderIcons = _ref.useFolderIcons,
        handleTouchTap = _ref.handleTouchTap;


    if (searchMode) return _renderItems(items, expandedListItems, useFolderIcons, handleTouchTap);

    return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        { transitionName: 'tree-list', transitionEnterTimeout: 300, transitionLeaveTimeout: 150 },
        _renderSortableItems(items, expandedListItems, useFolderIcons, handleTouchTap)
    );
});

function _renderSortableItems(items, expandedListItems, useFolderIcons, handleTouchTap) {
    var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref2) {
        var value = _ref2.value;

        var i = items.indexOf(value);
        return _react2.default.createElement(_ListItem2.default, {
            key: 'treeListItem-' + i,
            primaryText: value._primaryText,
            style: Object.assign({}, value._styles.root, value._shouldRender ? {} : { display: 'none' }),
            leftIcon: _react2.default.createElement(DragHandle, null),
            rightIcon: !value.children ? null : expandedListItems.indexOf(i) === -1 ? _react2.default.createElement(_expandMore2.default, null) : _react2.default.createElement(_expandLess2.default, null),
            onTouchTap: function onTouchTap() {
                if (value.disabled) return;
                handleTouchTap(value, i);
            } });
    });

    return items.map(function (listItem, index) {
        return _react2.default.createElement(SortableItem, { value: listItem, key: 'item-' + index, index: index });
    });
}

function _renderItems(items, expandedListItems, useFolderIcons, handleTouchTap) {
    return items.map(function (listItem) {

        var i = items.indexOf(listItem);
        if (listItem._shouldRender) {
            return _react2.default.createElement(_ListItem2.default, {
                key: 'treeListItem-' + i,
                primaryText: listItem._primaryText,
                style: Object.assign({}, listItem._styles.root),
                leftIcon: getLeftIcon(listItem, useFolderIcons),
                rightIcon: !listItem.children ? null : expandedListItems.indexOf(i) === -1 ? _react2.default.createElement(_expandMore2.default, null) : _react2.default.createElement(_expandLess2.default, null),
                onTouchTap: function onTouchTap() {
                    if (listItem.disabled) return;
                    handleTouchTap(listItem, i);
                } });
        } else {
            return null;
        }
    });
}

var TreeList = function (_Component) {
    _inherits(TreeList, _Component);

    function TreeList(props) {
        _classCallCheck(this, TreeList);

        var _this = _possibleConstructorReturn(this, (TreeList.__proto__ || Object.getPrototypeOf(TreeList)).call(this, props));

        _this.state = {
            expandedListItems: [],
            activeListItem: null,
            searchTerm: '',
            items: props.listItems
        };

        _this.searchMode = false;
        _this.handleTouchTap = _this.handleTouchTap.bind(_this);
        return _this;
    }

    _createClass(TreeList, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                items: nextProps.listItems
            });
        }
    }, {
        key: 'handleTouchTap',
        value: function handleTouchTap(listItem, index) {
            console.warn('handletouchtap', listItem, index, this.props.handleTouchTap);
            if (this.searchMode) {
                if (!listItem.children) {
                    this.setState({
                        activeListItem: index
                    });
                }
            } else {
                if (listItem.children) {
                    var indexOfListItemInArray = this.state.expandedListItems.indexOf(index);
                    if (indexOfListItemInArray === -1) {
                        this.setState({
                            expandedListItems: this.state.expandedListItems.concat([index])
                        });
                    } else {
                        var newArray = [].concat(this.state.expandedListItems);
                        newArray.splice(indexOfListItemInArray, 1);
                        this.setState({
                            expandedListItems: newArray
                        });
                    }
                } else {
                    this.setState({
                        activeListItem: index
                    });
                }
            }

            if (this.searchMode && this.props.handleTouchTapInSearchMode) this.props.handleTouchTapInSearchMode(listItem, index);
            if (!this.searchMode && this.props.handleTouchTap) this.props.handleTouchTap(listItem, index);
        }
    }, {
        key: '_onSortEnd',
        value: function _onSortEnd(changes) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            // react-sortable-hoc seems to hijack the touch events, so that the handle never gets called.
            // if we are really just tapping in place, let's manually call the handleTouchTap function
            console.warn('onsortend called', changes, args);
            var oldIndex = changes.oldIndex,
                newIndex = changes.newIndex;

            if (oldIndex !== newIndex) {
                var _props;

                // actual drag, dont fire touchtap
                console.warn('onSortEnd', oldIndex, newIndex, args);
                this.setState({
                    items: (0, _reactSortableHoc.arrayMove)(this.state.items, oldIndex, newIndex)
                });
                (_props = this.props).onSortEnd.apply(_props, [changes].concat(args));
            } else {
                // tap in place, fire touchtap

                var item = this.state.items[newIndex];
                this.handleTouchTap(item, newIndex);
            }
        }
    }, {
        key: '_reorderItemArray',
        value: function _reorderItemArray(array, from, to) {
            // the problem here is that we are moving the items around but might also be changing them in the hierarchy.
            // thus we need to get an algo that updates the items accordingly.


        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            // required props
            var _props2 = this.props,
                children = _props2.children,
                contentKey = _props2.contentKey,
                useFolderIcons = _props2.useFolderIcons;
            var listItems = this.state.items;

            // optional props

            var style = this.props.style ? this.props.style : {};
            var startingDepth = this.props.startingDepth ? this.props.startingDepth : 1;
            var expandedListItems = this.props.expandedListItems ? this.props.expandedListItems : this.state.expandedListItems;
            var activeListItem = this.props.activeListItem ? this.props.activeListItem : this.state.activeListItem;
            var listHeight = this.props.listHeight ? this.props.listHeight : '48px';
            var _props3 = this.props,
                haveSearchbar = _props3.haveSearchbar,
                handleSearch = _props3.handleSearch;


            var listItemsModified = listItems.map(function (listItem, i, inputArray) {
                listItem._styles = {
                    root: {
                        paddingLeft: (listItem.depth - startingDepth) * 16,
                        backgroundColor: activeListItem === i ? 'rgba(0,0,0,0.2)' : null,
                        height: listHeight,
                        cursor: listItem.disabled ? 'not-allowed' : 'pointer',
                        color: listItem.disabled ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.87)',
                        overflow: 'hidden',
                        transform: 'translateZ(0)'
                    }
                };
                return listItem;
            });
            var searchTerm = this.props.searchTerm ? this.props.searchTerm : this.state.searchTerm;
            if (searchTerm) {
                this.searchMode = true;
                listItemsModified = listItemsModified.map(tagListItemsWithSearchTerm(searchTerm)).map(function (listItem, i, inputArray) {
                    listItem._shouldRender = listItem.searchMatched || childIsTaggedWithSearch(listItem, inputArray);
                    // highlighting search terms
                    if (listItem.highlight) {
                        var left = listItem[contentKey].substring(0, listItem.highlight[0]);
                        var middle = listItem[contentKey].substring(listItem.highlight[0], listItem.highlight[0] + listItem.highlight[1]);
                        var right = listItem[contentKey].substring(listItem.highlight[0] + listItem.highlight[1]);
                        listItem._primaryText = _react2.default.createElement(
                            'span',
                            null,
                            left,
                            _react2.default.createElement(
                                'span',
                                { style: { display: 'inline-block', backgroundColor: 'rgba(255,235,59,0.5)', padding: '3px' } },
                                middle
                            ),
                            right
                        );
                    } else {
                        listItem._primaryText = listItem[contentKey];
                    }
                    return listItem;
                });
            } else {
                this.searchMode = false;
                listItemsModified = listItemsModified.map(function (listItem, i) {
                    listItem._shouldRender = listItem.depth >= startingDepth && parentsAreExpanded(listItem, startingDepth, expandedListItems, listItems);
                    listItem._primaryText = listItem[contentKey];
                    return listItem;
                });
            }

            // styles for entire wrapper
            var styles = {
                root: {
                    padding: 0,
                    paddingBottom: 8,
                    paddingTop: children ? 0 : 8
                }
            };

            console.log('attempting render');
            return _react2.default.createElement(
                'div',
                { style: Object.assign({}, styles.root, style) },
                children,
                haveSearchbar && _react2.default.createElement(
                    'form',
                    {
                        style: { padding: '0px 16px' },
                        onSubmit: function onSubmit(e) {
                            e.preventDefault();
                            if (handleSearch) {
                                handleSearch(document.getElementById('searchfield').value);
                            } else {
                                _this2.setState({ searchTerm: document.getElementById('searchfield').value });
                            }
                            document.getElementById('searchfield').value = '';
                        } },
                    _react2.default.createElement(_TextField2.default, {
                        hintText: 'Search',
                        fullWidth: true,
                        id: 'searchfield' })
                ),
                _react2.default.createElement(SortableList, {
                    items: listItemsModified,
                    onSortEnd: this._onSortEnd.bind(this),
                    searchMode: this.searchMode,
                    expandedListItems: expandedListItems,
                    useFolderIcons: useFolderIcons,
                    handleTouchTap: this.handleTouchTap.bind(this)
                })
            );
        }
    }]);

    return TreeList;
}(_react.Component);

/*

 */

function getLeftIcon(listItem, useFolderIcons) {
    if (useFolderIcons) {
        if (listItem.children) {
            return _react2.default.createElement(_folder2.default, null);
        } else {
            return _react2.default.createElement(_insertDriveFile2.default, null);
        }
    } else {
        return listItem.icon;
    }
}

function parentsAreExpanded(listitem, startingDepth, expandedListItems, listItems) {
    if (listitem.depth > startingDepth) {
        if (expandedListItems.indexOf(listitem.parentIndex) === -1) {
            return false;
        } else {
            var parent = listItems.filter(function (_listItem, index) {
                return index === listitem.parentIndex;
            })[0];
            return parentsAreExpanded(parent, startingDepth, expandedListItems, listItems);
        }
    } else {
        return true;
    }
}

function tagListItemsWithSearchTerm(searchTerm, listItem) {
    var f = function f(listItem) {
        var searchTerms = searchTerm.split(' ');
        var match = false;
        var matchIndex = void 0,
            matchTermLength = void 0;

        if (searchTerms[0] !== '') {
            searchTerms.forEach(function (searchTerm) {
                var content = listItem[contentKey] ? listItem[contentKey] : '';
                matchIndex = content.toLowerCase().indexOf(searchTerm.toLowerCase());
                if (matchIndex !== -1) {
                    match = true;
                    matchTermLength = searchTerm.length;
                }
            });
        }

        if (match) {
            return Object.assign({}, listItem, { searchMatched: true, highlight: [matchIndex, matchTermLength] });
        } else {
            return listItem;
        }
    };

    if (listItem) {
        return f(listItem);
    } else {
        return f;
    }
}

function childIsTaggedWithSearch(listItem, listItems) {
    if (listItem.children) {
        for (var i = 0; i < listItem.children.length; i++) {
            if (listItems[listItem.children[i]].searchMatched) {
                return true;
            }
        }
    }
}

TreeList.contextTypes = {
    muiTheme: _react.PropTypes.object
};

TreeList.propTypes = {
    listItems: _react.PropTypes.array.isRequired,
    contentKey: _react.PropTypes.string.isRequired,
    style: _react.PropTypes.object,
    expandedListItems: _react.PropTypes.array,
    activeListItem: _react.PropTypes.number,
    handleTouchTap: _react.PropTypes.func,
    handleTouchTapInSearchMode: _react.PropTypes.func,
    handleSearch: _react.PropTypes.func,
    listHeight: _react.PropTypes.number,
    useFolderIcons: _react.PropTypes.bool,
    haveSearchbar: _react.PropTypes.bool,
    searchTerm: _react.PropTypes.string,

    // sortable props
    onSortEnd: _react.PropTypes.func
};

exports.default = TreeList;