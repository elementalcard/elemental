import getRoomStateFromRoomDoc from
  '../../businessLogic/getRoomStateFromRoomDoc';

export default (hostUid, callback) => {
  const roomRef = db.collection('rooms').doc(hostUid);
  return roomRef.onSnapshot((roomDoc) => {
    callback(roomDoc.exists, getRoomStateFromRoomDoc(roomDoc));
  });
};
