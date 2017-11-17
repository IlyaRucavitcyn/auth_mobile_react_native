import
    * as userAppointmentsAction
    from "./user-appointments-action";
jest.mock('../../services/firebase-client', () => ({
    getClient: () => ({
        pushValue: () => Promise.resolve()
    })
}))


describe("user appointments action creator testing", () => {
    const appointments = ["test_1", "test_2"];
    describe("setUserAppointmentsAction method", () => {

        test("should return action with right type and payload", () => {
            const action = userAppointmentsAction
                .setUserAppointmentsAction(appointments);
            expect(action).toMatchSnapshot()
        });
    })

    describe("addUserAppointmentsAction method", () => {
        const uid = "testing_uid";

        test("dispatch should be called when firebase pushValue resolved", async () => {
            const resultingThump = userAppointmentsAction
                .addUserAppointmentsAction(uid, appointments);
            const dispatch = jest.fn();
            await resultingThump(dispatch);
            expect(dispatch).toHaveBeenCalled();
            const action = dispatch.mock.calls[0][0];
            expect(action).toMatchSnapshot();
        });

        test.skip("dispatch should be called when firebase pushValue rejected", async () => {
            jest.resetModules();
            jest.doMock('../../services/firebase-client', () => ({
                getClient: () => ({
                    pushValue: () => Promise.reject()

                })
            }))
            const resultingThump = userAppointmentsAction
                .addUserAppointmentsAction(uid, appointments);
            const dispatch = jest.fn();
            await resultingThump(dispatch);
            expect(dispatch).toHaveBeenCalledWith(undefined);
        });
    })

})