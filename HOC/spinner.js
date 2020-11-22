import * as React from "react";
import { View, ActivityIndicator } from "react-native";

const withLoadingScreen = WrappedComponent => {
  return class LoadingScreen extends React.PureComponent {
    render() {
    if (this.props.isLoading) return <View
      style={{
          flex: 1
      }}><View
      style={{
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          opacity: 0.7,
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: 999999,
          position: "absolute"
      }}
      >
          <ActivityIndicator             
            size="small" 
            color="white" />
                    </View>

            <WrappedComponent {...this.props} />
      </View>
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoadingScreen;
