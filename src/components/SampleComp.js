import React from "react";

class SampleComp extends React.Component {

    state = {
        maintext: "Some Main text...",
        subtext: "Some sub text..."
    }

    modify = (e) => {
        e.preventDefault();

        // Pass props to App.js, then populate fields
        this.props.modifySampleHandler(this.state);
    }

    render() {
        return (
            <>
                <div class="ui hidden divider"></div>
                <h4 class="ui horizontal divider header">
                    <i class="tag icon"></i>
                    Sample Header
                </h4>
                <div class="ui center aligned container">
                    <h4>{this.state.maintext}: {this.state.subtext}</h4>
                </div>
                <div class="ui left aligned container">
                    <h4>Modify Text:</h4>
                </div>

                <div class="ui left icon input loading">
                    <input
                        type="text"
                        name="maintext"
                        value={this.state.maintext}
                        onChange={(e) => this.setState({ maintext: e.target.value })} />
                </div>
                <span><a style={{ marginLeft: '20px' }}></a></span>
                <div class="ui left icon input loading">
                    <input
                        type="text"
                        name="subtext"
                        value={this.state.subtext}
                        onChange={(e) => this.setState({ subtext: e.target.value })} />
                </div>
                <span><a style={{ marginLeft: '20px' }}></a></span>
                <button className="ui button green"
                    onClick={this.modify}>Modify</button>
            </>
        );
    };
};

export default SampleComp;