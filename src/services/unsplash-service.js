import axios from 'axios';
export const unsplashService = {
    getSplashImgs
}
async function getSplashImgs(searchWord ) {
    console.log('searchword', searchWord);

    try {
        const res = await axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=13&query=${searchWord}&client_id=bmI4ygV_CrD-SZAXUNhZ8KADYD7cHmSaOPhV-fVXcMc`);
        return res.data.results;
    } catch (err) {
        console.log('error in unsplash service', err);
        throw err;
    }
}