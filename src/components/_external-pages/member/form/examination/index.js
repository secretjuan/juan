import React, { useState, useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import InfoDialog from "./infoDialog";
import user_api from '../../../../../api/user'

const Examination = () => {
	const [selectedLink, setSelectedLink] = useState("Select Jobs");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [examUrl, setExamUrl] = useState([])

	const handleChange = (event) => {
		setSelectedLink(event.target.value);
		// setSelectedTitle(event.target.options[event.target.selectedIndex].innerText)
	};

	const openDialog = () => {
		setDialogOpen(true);
	};
	
	const closeDialog = () => {
	setDialogOpen(false);
	};

	useEffect(() =>{
		const fetchData = async () =>{
		  try{
			const response = await user_api.get_application_exam();
			const updatedExamUrls = response.data.map((data, index) => {
				const title = JSON.parse(data.meta_value);
				const url = JSON.parse(data.exams[0].meta_value);
				
				const incrementedLink = `${url.link}_${index + 1}`;
				
				return { id: data.id, title: title.title, link: incrementedLink };
			  });
			  
			  console.log(updatedExamUrls)
			  setExamUrl(examUrls => [...examUrls, ...updatedExamUrls]);
		  }catch(error){
			console.log("Error fetching:", error)
		  }
		}
		fetchData();
	  },[])
	
	// useEffect(() =>{
	// 	setExamUrl(examUrl =>[{...examUrl, id: 0, title:"Select Jobs", link:"test.test.com"}])
	// },[])

	return (
		<div sx={{display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<div style={{flex: 1, padding:"10px" }}>
				<div
					style={{
						fontWeight: "bold",
						textAlign: "left",
						fontSize: "1.5em",
						paddingTop: "5em",
					}}
				>
					Examination
				</div>
				<div style={{fontWeight: "bold"}}>Starry day! &#128512;</div>
				<div style={{ paddingTop: "1rem", marginBottom:"50px" }}>
					Welcome to 7-Star Manpower Services of the Philippines Corporation!
					Today, you are fews steps away from being hired and be part of the
					company by allowing you to take our Online Pre-Employment
					Examinations. Before starting your online pre-employment examination,
					please make sure that you are well-prepared and guided with each
					steps.
				</div>
				<div style={{textAlign:"left", padding:"10px"}}>
					<ol>
						<li>Pray and ask for guidance of the Lord.</li>
						<li>
							Internet connection should be in good and stable condition. Slow
							internet connection may affect the result of your examination.
						</li>
						<li>
							Click the URL link that will be sent to you. Once clicked, you are
							automatically directed to start. Avoid, opening other applications
							or windows while taking the examination. This will disrupt and
							limit the possibility of recording your anser, hence, may affect
							the result of your examination.
						</li>
						<li>
							Read and understand the test guidelines and directions. For any
							concerns noted, please do not hesitate to contact the Recruitment
							Head-in-charge.
						</li>
						<li>
							Once you passed the examination, the Recruitment Head-in-charge
							will contact you for the initial interview. Thank you. Good luck!
						</li>
					</ol>
				</div>
				<div>
					<Grid container spacing={3} style={{paddingTop: "2rem"}}>
						<Grid item xs={12} md={2}>
							<div
								style={{
									fontWeight: "bold",
									textAlign: "left",
									fontSize: "1.5em",
								}}
							>
								Applying For
							</div>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl sx={{ minWidth: 200 }}>
								<Select onChange={handleChange} value={selectedLink}>
									<MenuItem value="Select Jobs">
										<em>Select a Job</em>
									</MenuItem>
									{
										examUrl.length > 0 ?( 
										examUrl.map((item) =>(
											
											<MenuItem 
											 key={item.id} 
											 value={item.link}
											>
												{ item.title }
											</MenuItem>
										))
										):(
											<div>Loading ...</div>
										)
									}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container style={{marginTop:"50px"}}>
						<Grid item>
							<Button
							 style={{fontSize:"20px"}}
							 endIcon={<ArrowForwardIosOutlinedIcon/>}
							 onClick={() =>{
								if(selectedLink === "Select Jobs"){
									window.alert("Please Select a job")
								}else{
									openDialog()
								}
							 }} 
							> Start Exam 
							</Button>
						</Grid>
					</Grid>
					<InfoDialog showDialog={dialogOpen} handleClose={closeDialog} link={selectedLink}/>
				</div>
			</div>
		</div>
	);
};

export default Examination;
