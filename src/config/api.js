let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'owl.com') {
  backendHost = '';
} else {
  backendHost = process.env.REACT_MEIKO_HOST || 'https://meikoapp.herokuapp.com';
}

export const API_ROOT = backendHost;
