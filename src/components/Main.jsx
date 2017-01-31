import React from 'react';
import {SongContainer} from './Song';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';
import {LoginContainer} from './Login';
import {ListGroupItemContainer} from './ListGroupItem';
import {ListGroupItemGroupContainer} from './ListGroupItemGroup';
import {FriendGroupSearchContainer as FriendGroupSearch} from './FriendGroupSearch';
//import jsmediatags from "jsmediatags";
var jsmediatags = window.jsmediatags;


export const Main = React.createClass({
    songEnded: function(e){
        console.log(parseInt(this.props.chosenSongIndex)+1);
        //play next song in playlist array
        var nextSongObj = this.props.playlist.get(parseInt(this.props.chosenSongIndex)+1);
        this.props.setState({
            chosenSongId: nextSongObj.get('aid'),
            chosenSongMp3: nextSongObj.get('url'),
            chosenSongIndex: (parseInt(this.props.chosenSongIndex)+1),
            chosenSongName: (nextSongObj.get('artist') + ': ' + nextSongObj.get('title'))
        });
        this.playSong(nextSongObj);
    },
    componentDidMount: function() {
        var self = this;
        $("#jplayer_N").on("jPlayer_play", function(e){
            self.props.setNewCurrentSong(myPlaylist.current, self.props.playlist.get(myPlaylist.current));
        });

        var self = this;
        var friends = [];
        var groups = [];

        VK.Api.call('friends.get', {fields:'first_name, last_name, city, photo_50'}, function(r){
            friends = r.response;
            console.log(friends);
            VK.Api.call('groups.get', {extended:true}, function(r){
                groups = r.response;
                console.log(groups);
                self.props.receiveFriendsGroups(friends, groups);
            });
        });

        $(document).on('shown.bs.tab', function(e){
            self.props.tabChangeFriendsGroups($(e.target).attr('data-targetId'));
        });
    },
    componentWillUnmount: function(){
        $(this.refs.audio).unbind('audio');
    },
    handleFriendsChange(newFriendId){
        this.getAudios(newFriendId);
    },
    getAudios(owner_id){
        var self = this;
        VK.Api.call('audio.get', {owner_id: owner_id}, function(r){
            if(r.response){
                var audios = [];

                myPlaylist.remove();
                for(var i = 1; i < r.response.length; i++){
                    audios[i-1] = r.response[i];
                    audios[i-1].mp3 = audios[i-1].url;
                    audios[i-1].free = true;
                }
                myPlaylist.setPlaylist(audios);

                console.log(audios);

                self.props.setState({playlist: audios});
            }else{
                console.log(r);
            }
        });
    },
    handleGroupsChange(newFriendId){
        this.getAudios('-' + newFriendId);
    },
    playSong(songIndex){
        var audio = this.refs.audio;

        myPlaylist.play(parseInt( songIndex ));

        jsmediatags.read('http://localhost:8080/o.mp3', {
            onSuccess: function(tag) {
                console.log(tag);
            },
            onError: function(error) {
                console.log(error);
            }
        });
    },
    render: function() {
        return <section className="vbox">
            <LoginContainer />
            <section className="appcontainer">
                <section className="hbox stretch">
                    <aside className="bg-black dk nav-xs aside hidden-print" id="nav">
                        <section className="vbox">
                            <section className="w-f-md scrollable">
                                <div className="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="10px" data-railOpacity="0.2">
                                    <nav className="nav-primary hidden-xs">
                                        <ul className="nav bg clearfix">
                                            <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                                Discover
                                            </li>
                                            <li>
                                                <a href="index.html">
                                                    <i className="icon-disc icon text-success"></i>
                                                    <span className="font-bold">What's new</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="genres.html">
                                                    <i className="icon-music-tone-alt icon text-info"></i>
                                                    <span className="font-bold">Genres</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="events.html">
                                                    <i className="icon-drawer icon text-primary-lter"></i>
                                                    <b className="badge bg-primary pull-right">6</b>
                                                    <span className="font-bold">Events</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="listen.html">
                                                    <i className="icon-list icon  text-info-dker"></i>
                                                    <span className="font-bold">Listen</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="video.html" data-target="#content" data-el="#bjax-el" data-replace="true">
                                                    <i className="icon-social-youtube icon  text-primary"></i>
                                                    <span className="font-bold">Video</span>
                                                </a>
                                            </li>
                                            <li className="m-b hidden-nav-xs"></li>
                                        </ul>
                                        <ul className="nav" data-ride="collapse">
                                            <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                                Interface
                                            </li>
                                            <li >
                                                <a href="#" className="auto">
                        <span className="pull-right text-muted">
                          <i className="fa fa-angle-left text"></i>
                          <i className="fa fa-angle-down text-active"></i>
                        </span>
                                                    <i className="icon-screen-desktop icon">
                                                    </i>
                                                    <span>Layouts</span>
                                                </a>
                                                <ul className="nav dk text-sm">
                                                    <li >
                                                        <a href="layout-color.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Color option</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="layout-boxed.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Boxed layout</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="layout-fluid.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Fluid layout</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li >
                                                <a href="#" className="auto">
                        <span className="pull-right text-muted">
                          <i className="fa fa-angle-left text"></i>
                          <i className="fa fa-angle-down text-active"></i>
                        </span>
                                                    <i className="icon-chemistry icon">
                                                    </i>
                                                    <span>UI Kit</span>
                                                </a>
                                                <ul className="nav dk text-sm">
                                                    <li >
                                                        <a href="buttons.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Buttons</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="icons.html" className="auto">
                                                            <b className="badge bg-info pull-right">369</b>
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Icons</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="grid.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Grid</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="widgets.html" className="auto">
                                                            <b className="badge bg-dark pull-right">8</b>
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Widgets</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="components.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Components</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="list.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>List group</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="#table" className="auto">
                            <span className="pull-right text-muted">
                              <i className="fa fa-angle-left text"></i>
                              <i className="fa fa-angle-down text-active"></i>
                            </span>
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Table</span>
                                                        </a>
                                                        <ul className="nav dker">
                                                            <li >
                                                                <a href="table-static.html">
                                                                    <i className="fa fa-angle-right"></i>
                                                                    <span>Table static</span>
                                                                </a>
                                                            </li>
                                                            <li >
                                                                <a href="table-datatable.html">
                                                                    <i className="fa fa-angle-right"></i>
                                                                    <span>Datatable</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li >
                                                        <a href="#form" className="auto">
                            <span className="pull-right text-muted">
                              <i className="fa fa-angle-left text"></i>
                              <i className="fa fa-angle-down text-active"></i>
                            </span>
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Form</span>
                                                        </a>
                                                        <ul className="nav dker">
                                                            <li >
                                                                <a href="form-elements.html">
                                                                    <i className="fa fa-angle-right"></i>
                                                                    <span>Form elements</span>
                                                                </a>
                                                            </li>
                                                            <li >
                                                                <a href="form-validation.html">
                                                                    <i className="fa fa-angle-right"></i>
                                                                    <span>Form validation</span>
                                                                </a>
                                                            </li>
                                                            <li >
                                                                <a href="form-wizard.html">
                                                                    <i className="fa fa-angle-right"></i>
                                                                    <span>Form wizard</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li >
                                                        <a href="chart.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Chart</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="portlet.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Portlet</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="timeline.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Timeline</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li >
                                                <a href="#" className="auto">
                        <span className="pull-right text-muted">
                          <i className="fa fa-angle-left text"></i>
                          <i className="fa fa-angle-down text-active"></i>
                        </span>
                                                    <i className="icon-grid icon">
                                                    </i>
                                                    <span>Pages</span>
                                                </a>
                                                <ul className="nav dk text-sm">
                                                    <li >
                                                        <a href="profile.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Profile</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="blog.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Blog</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="invoice.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Invoice</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="gmap.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Google Map</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="jvectormap.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Vector Map</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="signin.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Signin</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="signup.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>Signup</span>
                                                        </a>
                                                    </li>
                                                    <li >
                                                        <a href="404.html" className="auto">
                                                            <i className="fa fa-angle-right text-xs"></i>

                                                            <span>404</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <ul className="nav text-sm">
                                            <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted">
                                                <span className="pull-right"><a href="#"><i className="icon-plus i-lg"></i></a></span>
                                                Playlist
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-music-tone icon"></i>
                                                    <span>Hip-Pop</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-playlist icon text-success-lter"></i>
                                                    <b className="badge bg-success dker pull-right">9</b>
                                                    <span>Jazz</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </section>

                            <footer className="footer hidden-xs no-padder text-center-nav-xs">
                                <div className="bg hidden-xs ">
                                    <div className="dropdown dropup wrapper-sm clearfix">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                      <span className="thumb-sm avatar pull-left m-l-xs">
                        <img src="images/a3.png" className="dker" alt="..."/>
                        <i className="on b-black"></i>
                      </span>
                                            <span className="hidden-nav-xs clear">
                        <span className="block m-l">
                          <strong className="font-bold text-lt">John.Smith</strong>
                          <b className="caret"></b>
                        </span>
                        <span className="text-muted text-xs block m-l">Art Director</span>
                      </span>
                                        </a>
                                        <ul className="dropdown-menu animated fadeInRight aside text-left">
                                            <li>
                                                <span className="arrow bottom hidden-nav-xs"></span>
                                                <a href="#">Settings</a>
                                            </li>
                                            <li>
                                                <a href="profile.html">Profile</a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="badge bg-danger pull-right">3</span>
                                                    Notifications
                                                </a>
                                            </li>
                                            <li>
                                                <a href="docs.html">Help</a>
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                                <a href="modal.lockme.html" data-toggle="ajaxModal" >Logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>            </footer>
                        </section>
                    </aside>
                    <section id="content">
                        <section className="hbox stretch">
                            <section>
                                <section className="vbox">
                                    <section className="scrollable padder-lg w-f-md" id="bjax-target">
                                        <a href="#" className="pull-right text-muted m-t-lg" data-toggle="class:fa-spin" ><i className="icon-refresh i-lg  inline" id="refresh"></i></a>
                                        <h2 className="font-thin m-b">Discover <span className="musicbar animate inline m-l-sm" style={{width:"20px",height:"20px"}}>
                                            <span className="bar1 a1 bg-primary lter"></span>
                                            <span className="bar2 a2 bg-info lt"></span>
                                            <span className="bar3 a3 bg-success"></span>
                                            <span className="bar4 a4 bg-warning dk"></span>
                                            <span className="bar5 a5 bg-danger dker"></span>
                                          </span></h2>


                                        {/*(!this.props.authenticated)? '':
                                        <div>
                                         <select ref="friendsSelect" onChange={this.handleFriendsChange} name="friends">
                                         <option value="-1">-</option>
                                         <option key={this.props.loggedInUser.get('id')} value={this.props.loggedInUser.get('id')} >
                                         {this.props.loggedInUser.get('first_name')+' '+this.props.loggedInUser.get('last_name')}
                                         </option>

                                         {this.props.friends.map((obj, index) =>
                                         <option key={obj.get('user_id')} value={obj.get('user_id')}>
                                         {obj.get('first_name')+' '+obj.get('last_name')}
                                         </option>
                                         )}
                                         </select>
                                         <select ref="groupsSelect" onChange={this.handleGroupsChange} name="groups">
                                         <option value='-1'>-</option>
                                         {this.props.groups.map((obj, index) =>
                                         (index==0)? '':<option key={obj.get('gid')} value={obj.get('gid')}>
                                         {obj.get('name')}
                                         </option>
                                         )}
                                         </select>
                                         </div>*/}


                                        {/*<div className="playList">
                                         <div className="playlistContainer">
                                         {this.props.playlist.map((obj, index) =>
                                         (index==0)? '':<SongContainer index={String(index)} changeSong={this.playSong} key={obj.get('aid')}
                                         url={obj.get('url')} aid={obj.get('aid')}
                                         entry={obj.get('artist') + ': ' + obj.get('title') }/>
                                         )}
                                         </div>
                                         </div>*/}

                                 {/*        <div className="player">

                                         <audio ref="audio" controls>
                                         <source src={this.props.chosenSongMp3} type="audio/mpeg"/>
                                         Your browser does not support the audio element.
                                         </audio>
                                         <span className="nowPlayingPrefix">Now playing: </span>
                                         <span className="nowPlaying">{this.props.chosenSongName}</span>


                                         </div>*/}
                                        <div className="row row-sm">

                                            {this.props.playlist.map((obj, index) =>
                                                <SongContainer index={String(index)} changeSong={this.playSong} key={obj.get('aid')}
                                                                              url={obj.get('url')} aid={obj.get('aid')} songObj = {obj}>
                                                </SongContainer>
                                            )}
                                        </div>
                                    </section>
                                    <footer className="footer bg-dark">
                                        <div id="jp_container_N" className="jp-video-270p">
                                            <div className="jp-type-playlist">
                                                <div id="jplayer_N" className="jp-jplayer hide" style={{"width": "480px", "height": "270px"}}>
                                                    <img id="jp_poster_0" src="images/m0.jpg" style={{"width": "480px", height: "270px", display: "inline"}}/>
                                                        <audio ref="audio" id="jp_audio_0" preload="metadata"
                                                               src={this.props.chosenSongMp3}
                                                               title="Busted Chump"></audio>
                                                        {/*<video id="jp_video_0" preload="metadata" title="Busted Chump" style={{"width": "0px", height: "0px"}}></video>*/}
                                                </div>
                                                <div className="jp-gui">
                                                    <div className="jp-video-play hide" style={{display: "block"}}>
                                                        <a className="jp-video-play-icon">play</a>
                                                    </div>
                                                    <div className="jp-interface">
                                                        <div className="jp-controls">
                                                            <div><a className="jp-previous"><i onClick={this.prevSong} className="icon-control-rewind i-lg"></i></a></div>
                                                            <div>
                                                                <a className="jp-play" style={{display: "inline-block"}}><i className="icon-control-play i-2x"></i></a>
                                                                <a className="jp-pause hid" style={{display: "none"}}><i className="icon-control-pause i-2x"></i></a>
                                                            </div>
                                                            <div><a className="jp-next"><i onClick={this.nextSong} className="icon-control-forward i-lg"></i></a></div>
                                                            <div className="hide"><a className="jp-stop"><i className="fa fa-stop"></i></a></div>
                                                            <div><a className="" data-toggle="dropdown" data-target="#playlist"><i className="icon-list"></i></a></div>
                                                            <div className="jp-progress hidden-xs">
                                                                <div className="jp-seek-bar dk" style={{"width": "100%"}}>
                                                                    <div className="jp-play-bar bg-info" style={{"width": "0%"}}>
                                                                    </div>
                                                                    <div className="jp-title text-lt" style={{display: "none"}}>Busted Chump</div>
                                                                </div>
                                                            </div>
                                                            <div className="hidden-xs hidden-sm jp-current-time text-xs text-muted">00:00</div>
                                                            <div className="hidden-xs hidden-sm jp-duration text-xs text-muted">00:00</div>
                                                            <div className="hidden-xs hidden-sm">
                                                                <a className="jp-mute" title="mute"><i className="icon-volume-2"></i></a>
                                                                <a className="jp-unmute hid" title="unmute" style={{"display": "none"}}><i className="icon-volume-off"></i></a>
                                                            </div>
                                                            <div className="hidden-xs hidden-sm jp-volume">
                                                                <div className="jp-volume-bar dk">
                                                                    <div className="jp-volume-bar-value lter" style={{"width": "80%"}}></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <a className="jp-shuffle" title="shuffle"><i className="icon-shuffle text-muted"></i></a>
                                                                <a className="jp-shuffle-off hid" title="shuffle off" style={{"display": "none"}}><i className="icon-shuffle text-lt"></i></a>
                                                            </div>
                                                            <div>
                                                                <a className="jp-repeat" title="repeat"><i className="icon-loop text-muted"></i></a>
                                                                <a className="jp-repeat-off hid" title="repeat off" style={{"display": "none"}}><i className="icon-loop text-lt"></i></a>
                                                            </div>
                                                            <div className="hide">
                                                                <a className="jp-full-screen" title="full screen"><i className="fa fa-expand"></i></a>
                                                                <a className="jp-restore-screen" title="restore screen" style={{"display": "none"}}><i className="fa fa-compress text-lt"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="jp-playlist dropup" id="playlist">
                                                    <ul className="dropdown-menu aside-xl dker" style={{"display": "block"}}><li className="jp-playlist-current"><div><a href="javascript:;" className="jp-playlist-item-remove">×</a><a href="javascript:;" className="jp-playlist-item jp-playlist-current" tabIndex="1">Busted Chump <span className="jp-artist">by ADG3</span></a></div></li><li><div><a href="javascript:;" className="jp-playlist-item-remove">×</a><a href="javascript:;" className="jp-playlist-item" tabIndex="1">Chucked Knuckles <span className="jp-artist">by 3studios</span></a></div></li><li><div><a href="javascript:;" className="jp-playlist-item-remove">×</a><a href="javascript:;" className="jp-playlist-item" tabIndex="1">Cloudless Days <span className="jp-artist">by ADG3 Studios</span></a></div></li><li><div><a href="javascript:;" className="jp-playlist-item-remove">×</a><a href="javascript:;" className="jp-playlist-item" tabIndex="1">Core Issues <span className="jp-artist">by Studios</span></a></div></li><li><div><a href="javascript:;" className="jp-playlist-item-remove">×</a><a href="javascript:;" className="jp-playlist-item" tabIndex="1">Cryptic Psyche <span className="jp-artist">by ADG3</span></a></div></li><li><div><a href="javascript:;" className="jp-playlist-item-remove">×</a><a href="javascript:;" className="jp-playlist-item" tabIndex="1">Electro Freak <span className="jp-artist">by Studios</span></a></div></li><li><div><a href="javascript:;" className="jp-playlist-item-remove">×</a><a href="javascript:;" className="jp-playlist-item" tabIndex="1">Freeform <span className="jp-artist">by ADG</span></a></div></li></ul>
                                                </div>
                                                <div className="jp-no-solution hide" style={{"display": "none"}}>
                                                    <span>Update Required</span>
                                                    To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                                                </div>
                                            </div>
                                        </div>
                                    </footer>
                                </section>
                            </section>
                            <aside className="aside-md bg-light dk" id="sidebar">
                                <section className="vbox animated fadeInRight">
                                    <section className="w-f-md scrollable hover">
                                        <div className="clearfix">
                                            <h4 className={(this.props.chosenFriendId>-1)? "m-l-md m-t active pull-left friendsContainer":
                                                "font-thin m-l-md m-t pull-left friendsContainer"}>
                                                <a href="#friends" data-targetId="#friends" data-toggle="tab">Friends</a></h4>
                                            <h4 className={(this.props.chosenGroupId>-1)? "m-l-md m-t active pull-right groupsContainer" :
                                                "font-thin m-l-md m-t pull-right groupsContainer"}><a href="#groups" data-targetId="#groups" data-toggle="tab">Groups</a></h4>
                                        </div>
                                        <div className="tab-content">
                                            <ul id="groups" className="list-group no-bg no-borders auto m-t-n-xxs tab-pane fade">

                                                {this.props.groups.map((obj, index) =>
                                                    (typeof obj == 'object')?<ListGroupItemGroupContainer obj={obj} key={obj.get('gid')} handleGroupsChange={this.handleGroupsChange}/>:''
                                                )}

                                                <li className="list-group-item">
                      <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                        <img src="images/a1.png" alt="..." className="img-circle"/>
                        <i className="on b-light right sm"></i>
                      </span>
                                                    <div className="clear">
                                                        <div><a href="#">Chris Fox</a></div>
                                                        <small className="text-muted">New York</small>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul id="friends" className="list-group no-bg no-borders auto m-t-n-xxs tab-pane fade in active">

                                                {this.props.friends.map((obj, index) =>
                                                    <ListGroupItemContainer obj={obj} key={obj.get('uid')} handleFriendsChange={this.handleFriendsChange}/>
                                                )}

                                                <li className="list-group-item">
                      <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                        <img src="images/a1.png" alt="..." className="img-circle"/>
                        <i className="on b-light right sm"></i>
                      </span>
                                                    <div className="clear">
                                                        <div><a href="#">Chris Fox</a></div>
                                                        <small className="text-muted">New York</small>
                                                    </div>
                                                </li>


                                                <li className="list-group-item">
                      <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                        <img src="images/a2.png" alt="..."/>
                        <i className="on b-light right sm"></i>
                      </span>
                                                    <div className="clear">
                                                        <div><a href="#">Amanda Conlan</a></div>
                                                        <small className="text-muted">France</small>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                    <footer className="footer footer-md bg-black">
                                        <FriendGroupSearch/>
                                    </footer>
                                </section>
                            </aside>
                        </section>
                        <a href="#" className="hide nav-off-screen-block" data-toggle="class:nav-off-screen,open" data-target="#nav,html"></a>
                    </section>
                </section>
            </section>

            </section>

              ;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.get('pair'),
        authenticated: state.get('authenticated'),
        loggedInUser: state.get('loggedInUser'),
        friends: state.get('friends'),
        groups: state.get('groups'),
        chosenFriendId: state.get('chosenFriendId'),
        chosenGroupId: state.get('chosenGroupId'),
        playlist: state.get('playlist'),
        chosenSongId: state.get('chosenSongId'),
        chosenSongMp3: state.get('chosenSongMp3'),
        chosenSongIndex: state.get('chosenSongIndex'),
        chosenSongName: state.get('chosenSongName'),
        chosenSongObj: state.get('chosenSongObj'),
        tabListActive: state.get('tabListActive')
    };
}

export const MainContainer = connect(mapStateToProps, actionCreators)(Main);