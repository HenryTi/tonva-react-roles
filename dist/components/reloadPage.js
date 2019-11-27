import * as React from 'react';
import { nav } from './nav';
import { Page } from './page';
export class ReloadPage extends React.Component {
    constructor(props) {
        super(props);
        this.reload = () => {
            clearInterval(this.timerHandler);
            nav.reload();
        };
        this.state = { seconds: 10 };
        this.timerHandler = setInterval(() => {
            let seconds = this.state.seconds;
            seconds--;
            if (seconds <= 0) {
                this.reload();
            }
            else {
                this.setState({ seconds: seconds });
            }
        }, 1000);
    }
    render() {
        return React.createElement(Page, { header: false },
            React.createElement("div", { className: "text-center p-5" },
                React.createElement("div", { className: "text-info py-5" },
                    "\u7A0B\u5E8F\u9700\u8981\u5347\u7EA7\uFF0C",
                    this.state.seconds,
                    "\u79D2\u949F\u4E4B\u540E\u81EA\u52A8\u91CD\u542F\u52A8...",
                    React.createElement("br", null),
                    React.createElement("span", { className: "small text-muted" }, this.props.message)),
                React.createElement("button", { className: "btn btn-danger", onClick: this.reload }, "\u7ACB\u523B\u5347\u7EA7")));
    }
}
export const ConfirmReloadPage = (props) => {
    return React.createElement(Page, { header: "\u5F7B\u5E95\u5347\u7EA7", back: "none" },
        React.createElement("div", { className: "p-5 m-5 border bg-white rounded" },
            React.createElement("div", { className: "text-center text-info" }, "\u6E05\u9664\u6240\u6709\u7F13\u51B2\u533A\u5185\u5BB9\uFF0C\u5E76\u91CD\u65B0\u52A0\u8F7D\u7F51\u9875"),
            React.createElement("div", { className: "text-center mt-5" },
                React.createElement("button", { className: "btn btn-primary mr-3", onClick: () => props.confirm(true) }, "\u786E\u8BA4\u5347\u7EA7"),
                React.createElement("button", { className: "btn btn-outline-primary", onClick: () => props.confirm(false) }, "\u4E0D\u5347\u7EA7"))));
};
//# sourceMappingURL=reloadPage.js.map