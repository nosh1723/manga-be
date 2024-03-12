const axios = require("axios");

const service = {
  fetchManga: async (req, res) => {
    try {
      const resManga = await axios.get("https://api.mangadex.org/manga", {
        params: {
          "order[latestUploadedChapter]": "desc",
          limit: 12,
          offset: 0,
        },
      });

      const listmanga = await Promise.all(
        resManga.data.data.map(async (manga) => {
          try {
            //get time updated
            const timeUpdate = new Date(manga.attributes.updatedAt);
            const timeNow = new Date();
            const Difference_In_Time = timeNow.getTime() - timeUpdate.getTime();
            const diffResult = Math.round(
              Difference_In_Time / (1000 * 3600 * 24)
            );
            let updatedAt;
            if (diffResult > 30)
              updatedAt = Math.floor(diffResult / 30) + " month ago";
            else if (diffResult < 1) updatedAt = "1 day ago";
            else updatedAt = diffResult + " day ago";

            //get last chapter
            const getChapters = await axios.get(
              `https://api.mangadex.org/manga/${manga.id}/feed`,
              {
                params: {
                  limit: 400,
                  offset: 0,
                  translatedLanguage: ["en"],
                  "order[volume]": "desc",
                  "order[chapter]": "desc",
                },
              }
            );
            const lastChapter = getChapters.data.data[0]
              ? getChapters.data.data[0].attributes.chapter
              : undefined;

            // //get cover art url
            const coverArtId = manga.relationships.find(
              (relation) => relation.type === "cover_art"
            ).id;
            const coverResponse = await axios.get(
              `https://api.mangadex.org/cover/${coverArtId}`
            );
            const coverFileName = coverResponse.data.data.attributes.fileName;
            const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`;
            return {
              id: manga.id,
              title: manga.attributes.title.en,
              description: manga.attributes.description.en,
              updatedAt,
              coverArt: coverUrl,
              quantityChapter: lastChapter,
            };
          } catch (error) {
            res.status(500).json({ err: "fails to load list manga" });
          }
        })
      );
      //   console.log(listmanga);
      res.status(200).json(listmanga);
    } catch (error) {
      res.status(500).json({ err: "err 1" });
    }
  },
};

module.exports = service;
