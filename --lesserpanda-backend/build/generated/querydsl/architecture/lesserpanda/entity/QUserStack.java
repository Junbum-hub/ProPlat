package architecture.lesserpanda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserStack is a Querydsl query type for UserStack
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserStack extends EntityPathBase<UserStack> {

    private static final long serialVersionUID = -23307033L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserStack userStack = new QUserStack("userStack");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMember member;

    public final QTechStack techStack;

    public QUserStack(String variable) {
        this(UserStack.class, forVariable(variable), INITS);
    }

    public QUserStack(Path<? extends UserStack> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserStack(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserStack(PathMetadata metadata, PathInits inits) {
        this(UserStack.class, metadata, inits);
    }

    public QUserStack(Class<? extends UserStack> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
        this.techStack = inits.isInitialized("techStack") ? new QTechStack(forProperty("techStack")) : null;
    }

}

