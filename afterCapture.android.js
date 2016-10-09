export default class AfterCapture extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} >
          <Text>Current Scene: { this.props.title }</Text>
          <TouchableHighlight onPress={this.props.onForward}>
            <Text>Tap me to load the next scene</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue'}} >
          <TouchableHighlight onPress={this.props.onBack}>
            <Text>Tap me to go back</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      </View>
    )
  }
}
