import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	firstname: '',
	lastname: '',
	email: '',
	phone: '',
	branch_of_service_affiliation: '',
	military_status: '',
	company: '',
	website: '',
	description_of_business: '',
	twitter_profile: '',
	instagram: '',
	facebook_profile: '',
	linkedin_profile: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loadUser: {
			reducer(state,action) {
				Object.assign(state, action.payload);
			},
			prepare(
				firstname,
				lastname,
				email,
				phone,
				branch_of_service_affiliation,
				military_status,
				company,
				website,
				description_of_business,
				twitter_profile,
				instagram,
				facebook_profile,
				linkedin_profile) {
				return {
					payload: {
						firstname,
						lastname,
						email,
						phone,
						branch_of_service_affiliation,
						military_status,
						company,
						website,
						description_of_business,
						twitter_profile,
						instagram,
						facebook_profile,
						linkedin_profile
					}
				}
			}
		},
		// other reducers
	}
});
export const {loadUser} = userSlice.actions;
export default userSlice.reducer;