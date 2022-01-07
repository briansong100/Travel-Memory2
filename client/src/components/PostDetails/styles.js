import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    padding: '20px',
    borderRadius: '15px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      maxWidth: '100%',
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    maxWidth: '60%',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      maxWidth: '100%',
    },
  },
  imageSection: {
    marginLeft: '20px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      maxWidth: '100%',
      flex: 1,
    },
  },
  card2: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // [theme.breakpoints.down('sm')]: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   flexDirection: 'column',
    // },
  },
  section2: {
    borderRadius: '20px',
    margin: '10px',
    width: '100%',
    flexWrap: 'wrap',
    display: 'flex',
  },
  recommendedPosts: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      // display: 'flex',
      // flexDirection: 'column',
      width: '100%',
    },

  },
  recommendedPost: {
    margin: '20px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '40%',

    },
  },
  recomendedImageWrap: {
    borderRadius: '15px',
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      width: '40%',
      margin: '20px',
    },

  },
  recomendedImage: {
    width: "250px",
    borderRadius: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  overlay: {
    position: 'absolute;',
    top: '0px',
    letf: '0px',
    color: 'white',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  fileInput: {
    width: '97%',
    margin: '20px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '20px',
    width: '50%',
  },
}));