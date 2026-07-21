'use strict';

class SessionMapper {

    static fromApi(session) {

        return {
            id: session.id,
        };

    }

}

module.exports = SessionMapper;