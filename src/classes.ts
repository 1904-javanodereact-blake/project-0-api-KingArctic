import User from "./classes/users";
import Role from "./classes/role";

export let theUsers: User[] =
    [
        new User(1, `All Might`, `IAmHere!`, `Toshinori`, `Yagi`, `yagitoshinori@uahigh.edu`, new Role(1, `Admin`)),
        new User(2, `Eraser Head`, `iwanttosleep...`, `Shota`, `Aizawa`, `aizawashota@uahigh.edu`, new Role(2, `Admin`)),
        new User(3, `Deku`, `AllMight#1`, `Izuku`, `Midoriya`, `midoriyaizuku@uahigh.edu`, new Role(3, `Employee`)),
        new User(4, `Ground Zero`, `DieDieDieDieDie!!!!!`, `Katsuki`, `Bakugo`, `bakugokatsuki@uahigh.edu`, new Role(4, `Employee`)),
        new User(5, `Uravity`, `NeverGiveUp!`, `Ochaco`, `Uraraka`, `urarakaochaco@uahigh.edu`, new Role(5, ``)),
        new User(6, `Ingenium `, `SupaFast!`, `Tenya`, `Iida`, `iidatenya@uahigh.edu`, new Role(6, `Employee`)),
        new User(7, `Froppy`, `RibbitRibbit?`, `Tsuyu`, `Asui`, `asuitsuyu@uahigh.edu`, new Role(7, `Employee`))
        // new User(8, `Grape Juice`, ``, ``, ``, `@uahigh.edu`, new Role(8, ``)),
        // new User(9, `Creati`, ``, ``, ``, `@uahigh.edu`, new Role(9, ``)),
        // new User(10, `Tsukuyomi`, ``, ``, ``, `@uahigh.edu`, new Role(10, ``)),
        // new User(11, `Chargebolt`, ``, ``, ``, `@uahigh.edu`, new Role(11, ``)),
        // new User(12, `Red Riot`, ``, ``, ``, `@uahigh.edu`, new Role(12, ``)),
        // new User(13, `Shoto`, ``, ``, ``, `@uahigh.edu`, new Role(13, ``)),
        // new User(14, `Alien Queen`, ``, ``, ``, `@uahigh.edu`, new Role(14, ``)),
        // new User(15, `Can't Stop Twinkling`, ``, ``, ``, `@uahigh.edu`, new Role(15, ``)),
        // new User(16, `Earphone Jack`, ``, ``, ``, `@uahigh.edu`, new Role(16, ``)),
        // new User(17, `Tentacole`, ``, ``, ``, `@uahigh.edu`, new Role(17, ``)),
        // new User(18, `Tailman`, ``, ``, ``, `@uahigh.edu`, new Role(18, ``)),
        // new User(19, `Cellophane`, ``, ``, ``, `@uahigh.edu`, new Role(19, ``)),
        // new User(20, `Invisible Girl`, ``, ``, ``, `@uahigh.edu`, new Role(20, ``)),
        // new User(21, `Anima`, ``, ``, ``, `@uahigh.edu`, new Role(21, ``)),
        // new User(22, `Sugarman`, ``, ``, ``, `@uahigh.edu`, new Role(22, ``)),
        // new User(23, ``, ``, ``, ``, ``, new Role(23, ``)),
        // new User(24, ``, ``, ``, ``, ``, new Role(24, ``)),
        // new User(25, ``, ``, ``, ``, ``, new Role(25, ``)),
        // new User(26, ``, ``, ``, ``, ``, new Role(26, ``)),
        // new User(27, ``, ``, ``, ``, ``, new Role(27, ``)),
        // new User(28, ``, ``, ``, ``, ``, new Role(28, ``)),
        // new User(29, ``, ``, ``, ``, ``, new Role(29, ``)),
        // new User(30, ``, ``, ``, ``, ``, new Role(30, ``))
    ];