import React, {Fragment, useContext, useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import ActivityGroup from "../ActivityGroup";
import Context from "./Context";
import AwaitingVerification from "../AwaitingVerification/AwaitingVerification";
import Activity from "../Activity";
import Container from "@material-ui/core/Container";
import {motion} from "framer-motion";
import {updatedUserActivity} from "../Activity/queries.graphql";
import {useApolloClient} from "@apollo/react-hooks";
import baseConfig from "../../base.config";

const useStyles = makeStyles(theme => ({
    playerRoot: {
        backgroundColor: '#fff',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
    },
    linerTop: {
        marginTop: '-80px'
    }
}));

const Home = ({initialData}) => {

    const classes = useStyles(),
        apolloClient = useApolloClient(),
        {session} = useContext(Context),
        {activitySteps, userActivities} = initialData ? initialData : {activitySteps: [], userActivities: []},
        [selectedUserActivityGroup, setSelectedUserActivityGroup] = useState(initialData ? initialData.userActivityGroups.edges.filter(edge => edge.node.selected).reduce((prev, x) => x.node, null) : null);

    console.log('---selectedUserActivityGroup---', selectedUserActivityGroup);

    useEffect(() => {
        if (initialData) return;
    }, []);

    return <Box>
        {
            session && <Box>
                {
                    session.user.type.id === '1' &&
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <Box boxShadow={4} className={classes.playerRoot} style={{
                            backgroundImage: `linear-gradient(rgba(255, 255, 255,0.6), rgba(255, 255, 255,1))${selectedUserActivityGroup.group.image ? `, url(${baseConfig.previewRoot}/${selectedUserActivityGroup.group.image.id})` : ''}`
                        }}>
                            <Box style={{
                                marginTop: '110px',
                                backgroundColor: '#ffffff44'
                            }}>
                                <ActivityGroup.Browser initialData={initialData ? initialData.userActivityGroups : null}
                                                       onSelect={setSelectedUserActivityGroup}/>
                                <Box className={classes.linerTop} id={"play"}>
                                    <Activity.Wizard userActivityGroup={selectedUserActivityGroup}
                                                     initialData={initialData ? {
                                                         activitySteps,
                                                         userActivities
                                                     } : null}/>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>
                }
            </Box>
        }
    </Box>
};

export default Home;
