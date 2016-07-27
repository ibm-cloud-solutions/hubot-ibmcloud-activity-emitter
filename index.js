/*
  * Licensed Materials - Property of IBM
  * (C) Copyright IBM Corp. 2016. All Rights Reserved.
  * US Government Users Restricted Rights - Use, duplication or
  * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
  */
/*
 * Used to emit messages for the activity taking place within our bot.  Pretty much all bot scripts are expected to
 * emit bot activity.  If you're interested to listen for such activity, it's best to search for "emitBotActivity" in
 * the script that does the action you're interested in or talk to the owner of that script.
 *
 * NOTE: once a script emits bot activity, it's best to limit changes to the emitBotActivity call.  It's okay to add new
 * data to the emitted bot activity.  However, be careful about changing the activity_id or removing data that's being
 * emitted, as a consumer of the bot.activity might be impacted.
 */
'use strict';

/*
 * Emits bot usage event.  Before calling add a translated representation of your activity_id to the i18n messages file.
 *
 * @param {Object} params.robot - Required
 * @param {Object} params.res - Optional, this is the robot response object.  @TODO: This should be removed, was added for twitter that shouldn't require it anymore.
 * @param {Object} params.activity - Required, Object with activity_id attribute identifying what activity took place.  This object may also container other useful info, but not required (app_name, app_guid, space_name, space_guid).
 *
 * Emitted message will be an object with these attributes:
 * 		- activity_id: (required) identifier for this activity.
 * 		- app_name, app_guid, space_name, space_guid: (optional) depends on the context of the bot action.
 *		- robot_res: (optional) Response object for the context that the activity took place in (i.e. robot room/channel, etc..).
 */
function emitBotActivity(robot, res, activity) {
	if (!robot) {
		console.error('robot not provided to emit bot activity.');
		return;
	}

	if (!activity || !activity.activity_id) {
		if (robot) {
			robot.logger.error('Bot activity is missing activity_id.  activity:');
			robot.logger.error(activity);
		}
		return;
	}

	if (res && res.robot) {
		activity.robot_res = res;
	}

	// provide robot response
	robot.emit('bot.activity', activity);
}

module.exports = {
	emitBotActivity
};
