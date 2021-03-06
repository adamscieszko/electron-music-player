import Axios from "axios";
import React from "react";
import Sound from "react-sound";

import Details from "../components/details.component";
import Footer from "../components/footer.component";
import Player from "../components/player.component";
import Progress from "../components/progress.component";
import Search from "../components/search.component";

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.client_id = "2f98992c40b8edf17423d93bda2e04ab";

        this.state = {
            track: {stream_url: "", title: "", artwork_url: ""},
            playStatus: Sound.status.STOPPED,
            elapsed: "00:00",
            total: "00:00",
            position: 0,
            playFromPosition: 0,
            autoCompleteValue: "",
            tracks: []
        }
    }

    componentDidMount() {
        this.randomTrack();
    }

    backward() {
        this.setState({playFromPosition: this.state.playFromPosition - 1000*10});
    }

    formatMilliseconds(milliseconds) {
        // var hours = Math.floor(milliseconds / 3600000);
        milliseconds = milliseconds % 3600000;

        var minutes = Math.floor(milliseconds / 60000);
        milliseconds = milliseconds % 60000;

        var seconds = Math.floor(milliseconds / 1000);
        milliseconds = milliseconds % 1000;

        return (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds;
    }

    forward() {
        this.setState({playFromPosition: this.state.playFromPosition + 1000*10});
    }

    handleChange(event, value) {
        this.setState({autoCompleteValue: event.target.value});
        let _this = this;

        Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
        .then(function (response) {
            _this.setState({tracks: response.data});
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    handleSelect(value, item) {
        this.setState({
            autoCompleteValue: value,
            track: item
        });
    }

    handleSongFinished() {
        this.randomTrack();
    }

    handleSongPlaying(audio) {
        this.setState({
            elapsed: this.formatMilliseconds(audio.position),
            total: this.formatMilliseconds(audio.duration),
            position: audio.position / audio.duration
        });
    }

    prepareUrl(url) {
        return `${url}?client_id=${this.client_id}`;
    }

    random() {
        this.randomTrack();
    }

    randomTrack() {
        let _this = this;

        Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
        .then(function (response) {
            const trackLength = response.data.tracks.length;
            const randomNumber = Math.floor((Math.random() * trackLength) + 1);

            _this.setState({track: response.data.tracks[randomNumber]});
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    stop() {
        this.setState({
            playStatus: Sound.status.STOPPED,
            position: 0,
            elapsed: "00:00"
        });
    }

    togglePlay() {
        if(this.state.playStatus === Sound.status.PLAYING) {
            this.setState({playStatus: Sound.status.PAUSED});
        } else {
            this.setState({playStatus: Sound.status.PLAYING});
        }
    }

    xlArtwork(url){
        return url.replace(/large/, "t500x500");
    }

    render() {
        const scotchStyle = {
            width: "500px",
            height: "500px",
            backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.7),
                    rgba(0, 0, 0, 0.7)
                ), url(${this.xlArtwork(this.state.track.artwork_url)})`
        }
        return (
            <div className="scotch_music" style={scotchStyle}>
                <Search
                    autoCompleteValue={this.state.autoCompleteValue}
                    tracks={this.state.tracks}
                    handleSelect={this.handleSelect.bind(this)}
                    handleChnage={this.handleChange.bind(this)}
                />
                <Details
                    title={this.state.track.title}
                />
                <Player
                    togglePlay={this.togglePlay.bind(this)}
                    stop={this.stop.bind(this)}
                    playStatus={this.state.playStatus}
                    forward={this.forward.bind(this)}
                    backward={this.backward.bind(this)}
                    random={this.random.bind(this)}
                />
                <Progress
                    position={this.state.position}
                    elapsed={this.state.elapsed}
                    total={this.state.total}
                />
                <Sound
                    url={this.prepareUrl(this.state.track.stream_url)}
                    playStatus={this.state.playStatus}
                    onPlaying={this.handleSongPlaying.bind(this)}
                    playFromPosition={this.state.playFromPosition}
                    onFinishedPlaying={this.handleSongFinished.bind(this)}
                />
                <Footer />
            </div>
        );
    }
}

export default AppContainer;
