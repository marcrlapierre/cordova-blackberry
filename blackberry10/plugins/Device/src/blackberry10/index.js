/*
 * Copyright 2010-2011 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getModelName () {
    var modelName = window.wp.device.modelName;
    //Pre 10.2 (meaning Z10 or Q10)
    if (typeof modelName === "undefined") {
        if (window.screen.height === 720 && window.screen.width === 720) {
            modelName = "Q10";
        } else if ((window.screen.height === 1280 && window.screen.width === 768) ||
                   (window.screen.height === 768 && window.screen.width === 1280)) {
            modelName = "Z10";
        } else {
            modelName = window.wp.device.deviceName;
        }
    }

    return modelName;
}

function getUUID () {
    var uuid = "";
    try {
        //Must surround by try catch because this will throw if the app is missing permissions
        uuid = window.wp.device.devicePin;
    } catch (e) {
        //DO Nothing
    }
    return uuid;
}

module.exports = {
    getDeviceInfo: function (success, fail, args, env) {
        var result = new PluginResult(args, env),
            modelName = getModelName(),
            uuid = getUUID(),
            info = {
                platform: "blackberry10",
                version: window.wp.device.scmBundle,
                model: modelName,
                name: modelName, // deprecated: please use device.model
                uuid: uuid,
                cordova: "dev"
            };
        result.ok(info);
    }
};