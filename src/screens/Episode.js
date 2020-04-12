import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import EpisodeDetail from "../components/EpisodeDetail";
import {Actions} from "react-native-router-flux";
import Video from 'react-native-video';
import TrackDetails from '../components/TrackDetails';
import SeekBar from '../components/SeekBar';
import Controls from '../components/Controls';

export default class Episode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paused: true,
            totalLength: 1,
            currentPosition: 0,
            selectedTrack: 0,
            repeatOn: false,
            shuffleOn: false,
        };
    }

    setDuration(data) {
        // console.log(totalLength);
        this.setState({totalLength: Math.floor(data.duration)});
    }

    setTime(data) {
        //console.log(data);
        this.setState({currentPosition: Math.floor(data.currentTime)});
    }

    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.seek(time);
        this.setState({
            currentPosition: time,
            paused: false,
        });
    }

    onBack() {
        if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({isChanging: true});
            setTimeout(() => this.setState({
                currentPosition: 0,
                paused: false,
                totalLength: 1,
                isChanging: false,
                selectedTrack: this.state.selectedTrack - 1,
            }), 0);
        } else {
            this.refs.audioElement.seek(0);
            this.setState({
                currentPosition: 0,
            });
        }
    }

    onForward() {
        if (this.state.selectedTrack < this.props.tracks.length - 1) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({isChanging: true});
            setTimeout(() => this.setState({
                currentPosition: 0,
                totalLength: 1,
                paused: false,
                isChanging: false,
                selectedTrack: this.state.selectedTrack + 1,
            }), 0);
        }
    }

    selectEpisode = () => {
    }


    render() {
        const track = this.props.tracks[this.state.selectedTrack];
        // console.warn("aa", track.audioUrl)
        let eng = "https://duopod.s3.ap-south-1.amazonaws.com/1/1/en/naval.mp3"
        let ge = "https://duopod.s3.ap-south-1.amazonaws.com/1/1/de/output.mp3"
        const video = this.state.isChanging ? null : (
            <Video source={{uri: this.state.language === 'German' ? ge : eng}} // Can be a URL or a local file.
                   ref="audioElement"
                   paused={this.state.paused}               // Pauses playback entirely.
                   resizeMode="cover"           // Fill the whole screen at aspect ratio.
                   repeat={true}                // Repeat forever.
                   onLoadStart={this.loadStart} // Callback when video starts to load
                   onLoad={this.setDuration.bind(this)}    // Callback when video loads
                   onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
                   onEnd={this.onEnd}           // Callback when playback finishes
                   onError={this.videoError}    // Callback when video cannot be loaded
                   style={styles.audioElement}/>
        );
        return (
            <View style={styles.container}>
                <TrackDetails title={track.title} artist={track.artist}/>

                <EpisodeDetail selectEpisodeKey={this.state.selectEpisodeKey} startPlay={(id, lan) => {
                    console.warn("as", id)
                    this.setState({language: id})
                }} stopPlay={(id, lan) => {
                    console.warn("as", id)
                    this.setState({language: id})

                }}/>
                <SeekBar
                    onSeek={this.seek.bind(this)}
                    trackLength={this.state.totalLength}
                    onSlidingStart={() => this.setState({paused: true})}
                    currentPosition={this.state.currentPosition}/>

                <Controls
                    onPressRepeat={() => this.setState({repeatOn: !this.state.repeatOn})}
                    repeatOn={this.state.repeatOn}
                    shuffleOn={this.state.shuffleOn}
                    forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
                    onPressShuffle={() => {
                        Actions.Episodes();
                        this.setState({shuffleOn: !this.state.shuffleOn})
                    }}
                    onPressPlay={() => this.setState({paused: false})}
                    onPressPause={() => this.setState({paused: true})}
                    onBack={this.onBack.bind(this)}
                    onForward={this.onForward.bind(this)}
                    paused={this.state.paused}/>

                {video}
            </View>
        );
    }
}

const {width, height} = Dimensions.get('window');
const imageSize = width;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 10,
    },
    image: {
        width: 25,
        height: 25,
        // backgroundColor:'red'
    },
    item: {
        color: 'white'
    },
    playButton: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 100 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryControl: {
        height: 18,
        width: 18,
    },
    off: {
        opacity: 0.30,
    }
})
