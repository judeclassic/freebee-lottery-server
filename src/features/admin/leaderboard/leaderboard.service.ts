import { IPaginatedRanking, IRanking, RankingModel } from "../../../shared/data/models/tasks/ranking";
import { IPaginatedTask, ITask, TaskModel } from "../../../shared/data/models/tasks/task";
import { UserModel } from "../../../shared/data/models/user";
import { IPaginateOptions, IResponse } from "../../../shared/utils/types";

export type LeaderRewardProps = {
    number: number;
    reward: number;
}

export type RemoveUserProps = {
    id: string;
}

const AdminLeaderboardService = {
    rewardUsers: async (props: LeaderRewardProps): IResponse<IPaginatedRanking> => {
        try {
            const rankedUsers = await RankingModel.paginate({ }, {
                limit: props.number,
                page: 1,
                sort: { ratings: +1}
            });
            if (!rankedUsers) {
                return { status: false, message: 'unable to get top users' };
            }

            const rewardedUsers = await UserModel.updateMany({
                "$or": [...rankedUsers.docs.map((user) => ({ _id: user._id}))]
            });
            if (!rewardedUsers) {
                return { status: false, message: 'unable to reward users' };
            }

            return { status: true, data: {
                total_rankings: rankedUsers.totalDocs,
                rankings: rankedUsers.docs,
                has_next: rankedUsers.hasNextPage
            }};
        } catch (err) {
            return { status: false, message: err as string };
        }
    },

    removeUserFromBoard: async ({ id }: RemoveUserProps): IResponse<IRanking> => {
        try {
            const rankedUser = await RankingModel.findByIdAndDelete(id);
            if (!rankedUser) {
                return { status: false, message: 'unable to remove this task' };
            }

            return { status: true, data: rankedUser }
        } catch (err) {
            return { status: false, message: err as string };
        }
    },

    viewAllRankings: async ({ limit, page }: IPaginateOptions): IResponse<IPaginatedRanking> => {
        try {
            const rankedUsers = await RankingModel.paginate({}, { limit, page });
            if (!rankedUsers) {
                return { status: false, message: 'unable to get all this tasks' };
            }

            return { status: true, data: {
                total_rankings: rankedUsers.totalDocs,
                rankings: rankedUsers.docs,
                has_next: rankedUsers.hasNextPage
            } };
        } catch (err) {
            return { status: false, message: err as string };
        }
    },

    clearLeaderboard: async (): IResponse<{ count: number}> => {
        try {
            const rankedUsers = await RankingModel.deleteMany({});
            if (!rankedUsers) {
                return { status: false, message: 'unable to get all this tasks' };
            }

            return { status: true, data: { count: rankedUsers.deletedCount }};
        } catch (err) {
            return { status: false, message: err as string };
        }
    }
}

export default AdminLeaderboardService;