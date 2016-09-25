import React from 'react';

export default React.createClass({

    render: function() {
        return <div className="songContainer">
                        <button className="song">
                            <h1>{this.props.entry}</h1>
                        </button>
                </div>;
    }
});