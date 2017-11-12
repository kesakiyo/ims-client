/* Internal dependencies */
import client from './client';

const getList = (interviewId) => client.get(`/interviews/${interviewId}/questions`)

const upsertAnswer = (id, answer) => (
  client.post(`/questions/${id}/answers`, answer)
)

const uploadFile = (id, answerId, blob) => {
  const formdata = new FormData();
  formdata.append('file', blob);
  return client.postByForm(`/questions/${id}/answers/${answerId}/files`, formdata);
}

export default {
  getList,
  upsertAnswer,
  uploadFile,
}
