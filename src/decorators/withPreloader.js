/* External Dependencies */
import { createPreLoader } from 'redux-preloader';

/* Internal Dependencies */
import Loader from '../elements/Loader';

const preLoader = createPreLoader({
  DefaultLoadingComponent: Loader,
});

export default preLoader;
