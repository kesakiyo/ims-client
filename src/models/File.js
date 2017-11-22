/* External dependencies */
import Immutable from 'immutable';

const FileRecord = Immutable.Record({
  name: '',
  url: '',
  fileSize: 0,
  mimeType: '',
})

class File extends FileRecord {
  constructor(args = {}) {
    const { size, ...remainArgs } = args;
    super({
      ...remainArgs,
      fileSize: size,
    })
  }
}

export default File;
