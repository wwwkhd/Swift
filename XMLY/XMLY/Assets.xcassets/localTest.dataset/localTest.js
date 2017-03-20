var multiply = function(a, b) {
    return '1.OC_JS [multiply]: ' + a*b;
};

require('XMRecorderManager,XMRecordSaveManager,XMBehaviorMgr,NSNotificationCenter');
defineClass('XMRecordAuditionViewController', {
            onConfirmSaveButtonClicked: function() {
            var recordIndex = XMRecorderManager.sharedManager().record();
            recordIndex.setTitle(self.saveView().getTitleStr());
            recordIndex.setDuration(XMRecorderManager.sharedManager().allDuration());
            
            var manager = XMRecordSaveManager.sharedManager();
            manager.addRecord(recordIndex);
            
            XMRecorderManager.sharedManager().stopPlayRecordFile();
            XMRecorderManager.sharedManager().stopWorking();
            
            var slf = self;
            self.dismissViewControllerAnimated_completion(YES, block(function() {
                     if (slf.behaviorProps()) {
                      XMBehaviorMgr.shareInstance().postStaticAppName_serviceId_otherProps_trackDic("event", "completeRecord", slf.behaviorProps(), null);
                     }
                     if (!slf.activityItem()) {
                    NSNotificationCenter.defaultCenter().postNotificationName_object("RecordSaveNotification", null);
                     } else {
                     NSNotificationCenter.defaultCenter().postNotificationName_object("ActiveRecordSaveNotification", null);
                     }
                     console.log("---XMRecordAuditionViewController patched---");
                     }));
            },
            });


require('SDWebImageManager');
defineClass('XMSystem', {}, {
            imageFromSDWebImage: function(url) {
            var image = SDWebImageManager.sharedManager().imageWithURL(url);
            if (!image) {
            SDWebImageManager.sharedManager().downloadWithURL_delegate(url, self);
            }
//            console.log("---XMsystem patched---");

            return image;
            },
            });

defineClass("XMPlayer", {
            willUpdateTrackInfo: function(track) {
                if (0 == track.sourceAlbumId()) {
                    track.setSourceUid(track.uid());
                    track.setSourceAlbumId(track.albumId());
                    track.setSourceAlbumName(track.albumName());
                    track.setSourceAlbumImage(track.albumImage());
                }
                self.performSelector_withObject_afterDelay("requestAlbumMoreTrackIfNeed", null, 0);
            },
            
            requestAlbumMoreTrackIfNeed: function() {
                console.log("---XMPlayer patched 0---");
                if (!self.isAlbumList()) {
                    return;
                }
                console.log("---XMPlayer patched 1---");
                var lastObject = self.mPlayList().lastObject();
                if (lastObject.trackId() != self.currentTrack().trackId()) {
                    return;
                }
                console.log("---XMPlayer patched 2---");
                self.requestAlbumMoreTrack(self.currentTrack());
            }
}, {});

