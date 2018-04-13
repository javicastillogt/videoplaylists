import React from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import moment from 'moment';

//custom components
import VideoItem from './video_item';
import VideoListContainer from './video_list_container';

const SearchResultsContainer = styled.div`
  padding: 20px 20px 0;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;
const SearchResultsTitle = styled.h1`
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 10px;
`;

const SearchResults = (props) => {

  if (props.searchResults.length === 0) {
    return null;
  }

  const searchResults = map(props.searchResults, video => ({
    timestamp: new Date(),
    videoEtag: video.etag,
    videoID: video.id.videoId,
    videoTitle: video.snippet.title,
    videoChannel: video.snippet.channelTitle,
    datePublished: video.snippet.publishedAt,
    duration: video.contentDetails ? video.contentDetails.duration : null,
  }))

  return(
    <SearchResultsContainer>
      <SearchResultsTitle>Search Results</SearchResultsTitle>
      <VideoListContainer 
        playlistVideos={searchResults}

        user={props.user}
        libraryVideos={props.libraryVideos}
        currentVideoId = {props.videoId}

        origin={/watch.*/.test(props.history.location.pathname) ? "radio" : "search"}

        togglePlayer={props.togglePlayer}
        togglePlaylistPopup={props.togglePlaylistPopup}
        toggleSearchPlayer={props.toggleSearchPlayer}

        onAddToPlaylist={props.onAddToPlaylist}
        onRemoveFromPlaylist={props.onRemoveFromPlaylist}
        onAddToLibrary={props.onAddToLibrary}
        onRemoveFromLibrary={props.onRemoveFromLibrary}

        setSnackbar={props.setSnackbar}
      />
    </SearchResultsContainer>
  );
}

export default SearchResults;
