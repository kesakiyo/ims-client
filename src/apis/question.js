/* Internal dependencies */
import client from './client';

const getList = (interviewId) => client.get(`/interviews/${interviewId}/questions`)

export default {
  getList,
}
