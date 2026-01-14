# Kaltura Video Downloader
Some courses that use [Canvas](https://www.instructure.com/) host videos on [Kaltura](https://corp.kaltura.com/) with no option to download the video from the UI. This chromium extension gets the `.mp4` link from network requests for easy download in the extension UI. Simply load a page which hosts a video on Kaltura, and the video will be available for download.

## Install
- Download the source files into a folder
- Go to your browser's extension management (e.g. [chrome://extensions](chrome://extensions)) and Load unpacked.

## Notes
- Inspiration from the [reddit post](https://www.reddit.com/r/UBC/comments/n3rxon/how_to_download_lecture_videos_from_canvas/)
- Won't work properly if there are two embedded Kaltura videos on the same website. Only one of them will show up.