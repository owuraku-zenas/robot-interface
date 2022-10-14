import React, { Component } from 'react';
import ReactNipple from 'react-nipple'; 
import ROSLIB from 'roslib';

class Joystick extends Component {

    state = {
        ros : null,
        cmdVelPublisher: null,
        linear: 0,
        angular: 0,
        stopPub: false,
    }

    constructor(){
		super();
		this.init_connection();
        this.move = this.move.bind(this);
        this.moveAction = this.moveAction.bind(this);
	}

    init_connection(){
		// eslint-disable-next-line

		this.state.ros = new ROSLIB.Ros()

		this.state.ros.on("connection", () => {
			console.info("Connected to ROS:TELEOP");
		});

		this.state.ros.on("close", () => {
			console.warn("Disconnected from ROS:TELEOP");
		});

		this.state.ros.on("error", (error) => {});

		try{
			this.state.ros.connect(
				localStorage.getItem("rosURL")
			);
		}catch(error){
			console.error("Connection problem : TELEOP");
		}
	}

    move(evt, data) {

        var max_linear = 2.5; // m/s
        var max_angular = 2.0; // rad/s
        var max_distance = 75.0; // pixels;
        var linear_speed = Math.sin(data.angle.radian) * max_linear * data.distance/max_distance;
        var angular_speed = -Math.cos(data.angle.radian) * max_angular * data.distance/max_distance;

        this.setState({linear: linear_speed, angular: angular_speed});
    }

    moveAction() {

        let {linear, angular} = this.state;

        //create a ROS publisher to /cmd_vel
		var cmd_vel = new ROSLIB.Topic({
			ros: this.state.ros,
			name: "/cmd_vel",
			messageType: "geometry_msgs/Twist"
		});

        if(this.state.stopPub){
            linear = 0.0;
            angular = 0.0;
            clearInterval(this.cmdPubTimer)
            this.setState({stopPub: false})
        }

        let twist = new ROSLIB.Message({ 
            linear: { x: 0, y: 0, z: 0 },
            angular: { x: 0, y: 0, z: 0 }
        });

        if (linear !== undefined && angular !== undefined) {
            twist.linear.x = linear;
            twist.angular.z = angular;
        } else {
            twist.linear.x = 0;
            twist.angular.z = 0;
        }
        cmd_vel.publish(twist);
    }

    loopMoveAction() {

        this.cmdPubTimer = setInterval(this.moveAction, 25);
    }

    render() {
        return (
            <div style={{ position: "absolute", right: "5%", bottom: "5%" }}>
                <ReactNipple
                    options={{ mode: 'static', position: { top: '50%', left: '50%' }, color: '#fff', size: 150 }}
                    style={{
                        width: 150,
                        height: 150,
                        position: 'relative'
                    }}
                    onMove={(evt, data) => this.move(evt, data)}
                    onStart={(evt, data) => this.loopMoveAction()}
                    onEnd={(evt, data) => this.setState({stopPub: true})}
                    />
            </div>
            // <></>
        );
    }

}

export default Joystick