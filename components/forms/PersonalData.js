import {
	Button,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addPersonalData } from '../../redux/actions/resumeActions';

const PersonalDataForm = ({ closeDrawer, anchor }) => {
	// Dispatch
	const dispatch = useDispatch();

	// Get personalData State from globalState
	let personalData = useSelector((state) => state.resume.data.personalData);

	// Remove +91 from phoneNumber
	let phoneNumber = personalData.phoneNumber;
	phoneNumber = phoneNumber.replace('+91', '');
	console.log({ phoneNumber });
	personalData = { ...personalData, phoneNumber };
	console.log(personalData);

	// Validation Schema for PersonalData form
	const ValidationSchema = Yup.object().shape({
		name: Yup.string().required('Required').min(3, 'Too Short'),
		email: Yup.string().email(),
		designation: Yup.string(),
		country: Yup.string().required(),
		phoneNumber: Yup.string().min(10),
	});

	return (
		<Formik
			initialValues={{
				...personalData,
			}}
			validationSchema={ValidationSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				setTimeout(() => {
					if (!values.phoneNumber.startsWith('+91')) {
						values.phoneNumber = `+91${values.phoneNumber}`;
					}
					dispatch(addPersonalData(values));
					resetForm({
						name: '',
						email: '',
						phoneNumber: '',
						designation: '',
						country: '',
					});
					setSubmitting(false);
					closeDrawer();
				}, 400);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
				isSubmitting,
			}) => (
				<form className='' onSubmit={handleSubmit}>
					<TextField
						id='name'
						className='mt-10 pr-10'
						rows={1}
						variant='outlined'
						fullWidth
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.name}
						label={'Enter Name'}
						error={!!errors.name}
						helperText={errors.name}
					/>

					<TextField
						id='email'
						className='mt-10 pr-10'
						rows={1}
						variant='outlined'
						fullWidth
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.email}
						label={'Enter Email'}
						error={!!errors.email}
						helperText={errors.email}
					/>
					<TextField
						id='designation'
						className='mt-10 pr-10'
						rows={1}
						variant='outlined'
						fullWidth
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.designation}
						label={'Enter Designation'}
						error={!!errors.designation}
						helperText={errors.designation}
					/>
					<TextField
						id='country'
						className='mt-10 pr-10'
						rows={1}
						variant='outlined'
						fullWidth
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.country}
						label={'Enter Country'}
						error={!!errors.country}
						helperText={errors.country}
					/>

					<FormControl
						fullWidth
						className='mt-10 pr-10'
						variant='outlined'
						margin='normal'
					>
						<InputLabel htmlFor='phone-number-input'>
							Your Phone Number
						</InputLabel>
						<OutlinedInput
							onChange={(e) => {
								setFieldValue('phoneNumber', e.target.value);
							}}
							value={values.phoneNumber}
							placeholder={'9999000099'}
							id='phone-number-input'
							startAdornment={
								<InputAdornment position='start'>
									+91
								</InputAdornment>
							}
							fullWidth
							label={'Your Phone Number'}
							error={!!errors.phoneNumber}
						/>
						<FormHelperText className={'Mui-error'}>
							{errors.phoneNumber}
						</FormHelperText>
					</FormControl>

					<Button
						className='mt-6'
						variant='contained'
						color='primary'
						type='submit'
						disabled={isSubmitting}
					>
						Submit
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default PersonalDataForm;