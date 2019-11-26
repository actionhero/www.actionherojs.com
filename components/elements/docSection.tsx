import { Component } from "react";
import RedLine from "./redLine";
import Theme from "../theme";
import { Waypoint } from "react-waypoint";

interface Props {
  waypointEnter?: Function;
  waypointExit?: Function;
  id?: string;
  title: string;
  parent?: any;
}

export default class extends Component<Props> {
  render() {
    const {
      children,
      waypointEnter,
      waypointExit,
      id,
      title,
      parent
    } = this.props;

    let waypointEnterCallback = data => {};

    if (waypointEnter) {
      waypointEnterCallback = data => {
        waypointEnter.call(parent, id, data);
      };
    }

    let waypointExitCallback = data => {};

    if (waypointExit) {
      waypointExitCallback = data => {
        waypointExit.call(parent, id, data);
      };
    }

    return (
      <Waypoint onEnter={waypointEnterCallback} onLeave={waypointExitCallback}>
        <div>
          <br />
          <h2 id={id} style={Theme.typeography.h2}>
            <span style={{ fontWeight: 300, fontSize: 36 }}>{title}</span>
          </h2>
          <RedLine />
          <div
            style={{
              fontFamily: Theme.fonts.docs
            }}
          >
            {children}
          </div>
        </div>
      </Waypoint>
    );
  }
}
