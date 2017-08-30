export class UsersController {

    static viewsFolder = "users";

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    static index(req, res, next) {
        res.render(UsersController.viewsFolder + "/index",
            {msg: 'Hello Index Users page respond with a resource'}
        );
    };

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    static show(req, res, next) {
        res.render(UsersController.viewsFolder + "/show",
            {
                msg: 'Hello Show Users page respond with a resource',
                id: req.params.id
            }
        );
        console.log('ID:', req.params.id);
    }
}
