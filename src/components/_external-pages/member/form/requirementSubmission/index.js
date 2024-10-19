import React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@material-ui/core"
import Grid from "@mui/material/Grid";
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
const DropZoneStyle = styled('div')(({ theme }) => ({
	outline: 'none',
	display: 'flex',
	textAlign: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(7, 1),
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.background.neutral,
	border: `1px dashed ${theme.palette.grey[500_32]}`,
	'&:hover': { opacity: 0.72, cursor: 'pointer' },
	[theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'column' }
  }));

 
  
const RequirementSubmission = ({error, ...other}) => {
	
	const { getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({
		...other
	  });
	
	return (
		<>
			<div style={{ height: "500px" }}>
				<div
					style={{
						fontWeight: "bold",
						textAlign: "center",
						fontSize: "1.5em",
						paddingTop: "4em",
						paddingBottom: "1rem",
					}}
				>
					{" "}
					<Typography variant="h4" color="#54545c">Please provide the following documents</Typography>
				</div>
				<div style={{ overflowY: "scroll", height: "350px" }}>
					<div style={{ textAlign: "center" }}>
						<Grid container spacing={3}>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
								<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									 <DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>
										
									</DropZoneStyle>
									
								</Box>
								<div>
									<Typography >PSA / NSO Birth Certificate</Typography>
									<Typography variant="body2" color="#54545c">( Upload PSA / NSO BirthCertificate )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
							<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									 <DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>
										
									</DropZoneStyle>
									
								</Box>
								<div>
									<Typography>High School Diploma</Typography> 
									<Typography variant="body2" color="#54545c">( Upload High School Diploma )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
							<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									 <DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>
										
									</DropZoneStyle>
									
								</Box>
								<div>
									<Typography>Health Card</Typography>
									<Typography variant="body2" color="#54545c">( Upload Front and Back copy of Health Card )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
						</Grid>
					</div>
					<div style={{ textAlign: "center", paddingTop: "5rem" }}>
						<Grid container spacing={3}>
						<Grid item xs direction="column" container justifyContent="center" alignItems="center">
							<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									 <DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>
										
									</DropZoneStyle>
									
								</Box>
								<div>
									<Typography>Mayors Permit </Typography >
									<Typography variant="body2" color="#54545c">( Upload a copy of Mayors Permit )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
							<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>	
									</DropZoneStyle>	
								</Box>
								<div>
									<Typography>National Bureau of Investigation</Typography>
									<Typography variant="body2" color="#54545c">( Upload NBI Clearance )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
							<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>	
									</DropZoneStyle>	
								</Box>
								<div>
									<Typography>SSS E1 Form / Registration Form </Typography>
									<Typography variant="body2" color="#54545c">( Upload SSS E1 or Registration Form )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
						</Grid>
					</div>
					<div style={{ textAlign: "center", paddingTop: "5rem" }}>
						<Grid container spacing={3}>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
								<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>	
									</DropZoneStyle>	
								</Box>
								<div>
									<Typography>Philhealth Member’s Data Form/ ID </Typography>
									<Typography variant="body2" color="#54545c">( Upload Philhealth form or ID )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
								<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>	
									</DropZoneStyle>	
								</Box>
								<div>
									<Typography>Pag-IBIG Member’s Data Form/ ID </Typography>
									<Typography variant="body2" color="#54545c">( Upload PAG-IBIG form{" "}
									<b>or</b> ID )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
								<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>	
									</DropZoneStyle>	
								</Box>
								<div>
									<Typography>Terminal Identification Number ID </Typography>
									<Typography variant="body2" color="#54545c">( Upload TIN ID )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
						</Grid>
					</div>
					<div style={{ textAlign: "center", paddingTop: "5rem" }}>
						<Grid container spacing={3}>
						<Grid item xs direction="column" container justifyContent="center" alignItems="center">
							<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>	
									</DropZoneStyle>	
								</Box>
								
								<div>
									<Typography>2x2 picture </Typography>
									<Typography variant="body2" color="#54545c">( Upload <b>1 (One)</b> 2x2 Picture )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs drection="column" container justifyContent="center" alignItems="center">
							<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>
									</DropZoneStyle>	
								</Box>
								
								<div>
									<Typography>ID With Signature </Typography>
									<Typography variant="body2" color="#54545c">( Upload Valid ID with 3 Signatures )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
							<Grid item xs direction="column" container justifyContent="center" alignItems="center">
								<Box style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>
									</DropZoneStyle>	
								</Box>
								<div>
									<Typography> Vaxx Card </Typography>
									<Typography variant="body2" color="#54545c"> ( Upload Vaccination Card )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
							</Grid>
						</Grid>
					</div>
					<div style={{ textAlign: "center", paddingTop: "5rem" }}>
						<Grid  spacing={1}>
							<Grid item xs container direction="column" justifyContent="center" alignItems="center">
								<Box  style={{width: "180px", height: "200px"}}>
									{/* <img
										style={{ width: "200px", height: "200px" }}
										src="https://thumbs.dreamstime.com/b/under-review-red-rubber-stamp-over-white-background-88006284.jpg"
									/> */}
									<DropZoneStyle
										{...getRootProps()}
										sx={{
										...(isDragActive && { opacity: 0.72 }),
										...((isDragReject || error) && {
											color: 'error.main',
											borderColor: 'error.light',
											bgcolor: 'error.lighter'
										})
										}}
									>
										<input {...getInputProps()} />

										<CloudUploadOutlinedIcon color="secondary" fontSize="large" />
										<Typography gutterBottom variant="caption">
											Click or Drag file to Upload
										</Typography>	
									</DropZoneStyle>	
								</Box>
								<div>
									<Typography>Applicant Attire</Typography>
									<Typography variant="body2" color="#54545c">( Upload whole body front, back, right, left )</Typography>
								</div>
								{/* <div style={{ paddingTop: "1rem" }}>
									<input type="file" />
								</div> */}
								
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</>
	);
};

export default RequirementSubmission;
