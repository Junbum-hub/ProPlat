package architecture.lesserpanda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QClubStack is a Querydsl query type for ClubStack
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QClubStack extends EntityPathBase<ClubStack> {

    private static final long serialVersionUID = -306544932L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QClubStack clubStack = new QClubStack("clubStack");

    public final QClub club;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QTechStack techStack;

    public QClubStack(String variable) {
        this(ClubStack.class, forVariable(variable), INITS);
    }

    public QClubStack(Path<? extends ClubStack> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QClubStack(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QClubStack(PathMetadata metadata, PathInits inits) {
        this(ClubStack.class, metadata, inits);
    }

    public QClubStack(Class<? extends ClubStack> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.club = inits.isInitialized("club") ? new QClub(forProperty("club")) : null;
        this.techStack = inits.isInitialized("techStack") ? new QTechStack(forProperty("techStack")) : null;
    }

}

