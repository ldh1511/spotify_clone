import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
TrackItem.propTypes = {
	name_track: PropTypes.string
};

function TrackItem(props) {
	const { i, name_track, add_at,
		duration, image, name_artist,
		name_album, note, openTrackMenu,
		albumId, id_artist, id, checked,
		SaveTracksAction, data, removeFromTrack,
		getPreviewUrl, listTracks } = props;
	const handleSaveTrack = (checkState, idTrack, dataTrack) => {
		let curData = dataTrack.track === undefined ?
			{ track: dataTrack } : dataTrack
		if (checkState === false) { SaveTracksAction(idTrack, curData) }
		else { removeFromTrack(idTrack) }
	}
	const handlePlayAudio = (trackData) => {
		getPreviewUrl(trackData,listTracks)
	}
	const renderItem = () => {
		let xhtml = null;
		if (note === 'search-track') {
			xhtml = (
				<tr style={{ gridTemplateColumns: '5% 85% 10%' }} className="track-tr">
					<td>{i + 1}</td>
					<td className="track-info" onClick={() => handlePlayAudio(data)}>
						<img alt="" src={image} />
						<div className="track-info-right">
							<h3>{name_track}</h3>
							<span>{name_artist}</span>
						</div>
					</td>
					<td>
						<i className={checked === true ? `fas fa-heart item-icon active` : `far fa-heart item-icon`}
							onClick={() => handleSaveTrack(checked, id, data)}
						></i>
						<p>{duration}</p>
					</td>
				</tr>)
		} else if (note === 'album-track') {
			xhtml = (
			<tr style={{ gridTemplateColumns: '5% 85% 10%' }} className="track-tr">
				<td>{i + 1}</td>
				<td className="track-info" onClick={() => handlePlayAudio(data)}>
					<div className="track-info-right">
						<h3>{name_track}</h3>
					</div>
				</td>
				<td>
					<i className={checked === true ? `fas fa-heart item-icon active` : `far fa-heart item-icon`}></i>
					<p>{duration}</p>
				</td>
			</tr>)
		} else {
			xhtml = (
			<tr>
				<td onClick={() => handlePlayAudio(data)}>{i + 1}</td>
				<td className="track-info" >
					<img alt="" src={image} />
					<div className="track-info-right">
						<h3>{name_track}</h3>
						<span>{name_artist}</span>
					</div>
				</td>
				<td className="track-album">{name_album}</td>
				<td>{add_at}</td>
				<td>
					<i className={checked === true ? `fas fa-heart item-icon active` : `far fa-heart item-icon`}
						onClick={() => handleSaveTrack(checked, id, data)}
					></i>
					<p>{duration}</p>
					<i className="fas fa-ellipsis-h track-item--btn"
						onClick={() => openTrackMenu(albumId, name_artist, id_artist, id, data)}
					></i>
				</td>
			</tr>)
		}
		return xhtml;
	}
	return (
		<>
			{renderItem()}
		</>
	);
}

export default TrackItem;