import * as React from 'react';
import classNames from 'classnames';
export class DropdownActions extends React.Component {
    constructor(props) {
        super(props);
        this.handleDocumentClick = (evt) => {
            if (this.state.dropdownOpen === false)
                return;
            if (this.button && this.button.contains(evt.target))
                return;
            if (!this.menu)
                return;
            //if (!this.menu.contains(evt.target)) 
            this.toggle();
        };
        this.toggle = () => {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen
            });
        };
        this.state = {
            dropdownOpen: false
        };
    }
    componentWillMount() {
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('touchstart', this.handleDocumentClick);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('touchstart', this.handleDocumentClick);
    }
    render() {
        let { icon, actions, isRight, className } = this.props;
        if (isRight === undefined)
            isRight = true;
        let hasIcon = actions.some(v => v.icon !== undefined);
        let { dropdownOpen } = this.state;
        //isOpen={this.state.dropdownOpen} toggle={this.toggle}
        return React.createElement("div", { className: classNames('dropdown', className) },
            React.createElement("button", { ref: v => this.button = v, className: "cursor-pointer dropdown-toggle btn btn-sm", "data-toggle": "dropdown", "aria-expanded": dropdownOpen, onClick: this.toggle },
                React.createElement("i", { className: classNames('fa', 'fa-' + (icon || 'ellipsis-v')) })),
            React.createElement("div", { ref: v => this.menu = v, className: classNames({ "dropdown-menu": true, "dropdown-menu-right": isRight, "show": dropdownOpen }) }, actions.map((v, index) => {
                let { icon, caption, action } = v;
                if (icon === undefined && caption === undefined)
                    return React.createElement("div", { className: "dropdown-divider" });
                let i;
                if (hasIcon === true) {
                    if (icon !== undefined)
                        icon = 'fa-' + icon;
                    i = React.createElement(React.Fragment, null,
                        React.createElement("i", { className: classNames('fa', icon, 'fa-fw'), "aria-hidden": true }),
                        "\u00A0 ");
                }
                if (action === undefined)
                    return React.createElement("h6", { className: "dropdown-header" },
                        i,
                        " ",
                        caption);
                // eslint-disable-next-line
                return React.createElement("a", { className: "dropdown-item", key: index, href: "#/", onClick: (evt) => { evt.preventDefault(); action(); } },
                    i,
                    " ",
                    caption);
            })));
    }
}
//# sourceMappingURL=index.js.map