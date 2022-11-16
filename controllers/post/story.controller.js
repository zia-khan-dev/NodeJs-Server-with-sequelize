const {HttpStatus, CustomMessages} = require("../../helper/statusCode")
const Response = require("../../helper/response");
const StoryMedia = require("../../models/post/StoryMedia.model");
const Story = require("../../models/post/Story.model");



const create = async (req, res) => {
    try {
        // ==========================================
        

        // =============================================
        const storyData = req.body;
        storyData['user_id'] = req.profileActive;
    
            const story = await Story.create(req.body);
            console.log("story ===========",story );
    
        const storyMedias = [];
        await Promise.all(
            req.files.map(async (media) => {
                media["story_id"] = story.id;
                media["file_path"] = media.path;
                const storyMedia = await StoryMedia.create(media);
                storyMedias.push(storyMedia.dataValues);
            })
        );
            story.dataValues["media"] = storyMedias;
            console.log("storyMedias ===========",storyMedias );
    
            res.status(HttpStatus.CREATED.code).send(
                
            new Response(true, `STORY ${HttpStatus.CREATED.message}`, story));

    } catch (error) {

        if (error.name.includes('Sequelize')) { //Validation errors
            return helpers.validationHandler(res, error);
        }
        if (error.isJoi === true) {
            return res.status(HttpStatus.BAD_REQUEST.code).json({
                success: false,
                message: error.message
            });
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            message: error
        });


    }
}

// const getAll = async (req, res) => {
//     try {
//         const posts = await Story.findAll({
//             include: PostMedia,
//         });
//         posts
//             ? res.status(HttpStatus.OK.code).send(
//         new Response(true, `STORY ${HttpStatus.OK.message}`, posts)
//         )
//             : res.status(HttpStatus.NOT_FOUND.code).send(
//         new Response(false, `STORY ${HttpStatus.NOT_FOUND.message}`, posts)
//         );
//     } catch (error) {
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
//             new Response(false, `STORY ${error.errors[0].message}`, posts)
            
//         );
//     }
// };

const show = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await Story.findOne({
            where: {
                id,
            },
        });
        story
            ? res.status(HttpStatus.OK.code).send(
        new Response(true, `STORY ${HttpStatus.OK.message}`, story)
                )
            : res.status(HttpStatus.NOT_FOUND.msg).send(
        new Response(false, `STORY ${HttpStatus.NOT_FOUND.message}`, story)
               );
    } catch (error) {
        res.status(HttpStatus.OK.code).send(
        new Response(false, `STORY ${error.message}`, story)
        );
    }
};

const remove = async (req, res) => {
    try {
        
        const storyId = await Story.destroy({
            
            where: {
                user_id: req.profileActive,
                    id: req.params.id
            },
        });

        storyId
            ? res.status(HttpStatus.OK.code).send(
        new Response(true, `STORY ${HttpStatus.DELETED.message}`, storyId)
                
               )
            : res.status(HttpStatus.NOT_FOUND.code).send(
        new Response(false, `STORY ${HttpStatus.NOT_FOUND.message}`, storyId)
        );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send(
            new Response(false, `${CustomMessages.MESSAGE.inValid} STORY ID`, postId)
        );
    }
};



module.exports = {
    create,
    show,
    remove,
};
