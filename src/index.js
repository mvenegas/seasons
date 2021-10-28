import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

//Component based in function
// const App = () => {
//     window.navigator.geolocation.getCurrentPosition(
//         position => console.log(position),
//         err => console.log(err)
//     );
//     return <div>Latitud</div>
// };

//Component based in class

class App extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = { lat: null, errorMessage : '' };        
    }
    
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => 
                this.setState({ lat: position.coords.latitude}),
            err => this.setState( {errorMessage: err.message} )
        );
    }

    render() {        
        if (this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />
        }

        //return <div>Loading ...</div>
        return <Spinner message='Please accept location request' />
    }
}

ReactDom.render(<App />, document.getElementById('root'));