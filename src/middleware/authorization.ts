export function authorization(roles: number[]) {
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.roleid);
        if (isAuthorized) {
            next();
        }
        else
            res.sendStatus(403);
    };
}