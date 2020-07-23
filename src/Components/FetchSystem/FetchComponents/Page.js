import React from 'react';

class Page extends React.Component{
    render(){
        if(!this.props.display){return(null)}
        return(
        <div className="page">
            <div onClick={()=>this.props.whichPage("previous")}></div>
            {this.props.page}
            <div onClick={()=>this.props.whichPage("next")}></div>
        </div>
        )
    }
}

export default Page