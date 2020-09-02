import React from 'react';
import { Card , CardContent , Typography } from "@material-ui/core";
function InfoBox({title , cases , total}) {
    return (
        <Card>
            <CardContent className="infoBox">
                {/* Title : CoronaVirus Cases*/}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* No of Cases 230 K */}
                    <h2 className="infoBox__cases">
                        {cases}
                    </h2>
                {/* Total = 1.2 M  */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
