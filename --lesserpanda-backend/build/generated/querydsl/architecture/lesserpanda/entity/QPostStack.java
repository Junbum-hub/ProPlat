package architecture.lesserpanda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostStack is a Querydsl query type for PostStack
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPostStack extends EntityPathBase<PostStack> {

    private static final long serialVersionUID = 1640131890L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPostStack postStack = new QPostStack("postStack");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QPost post;

    public final QTechStack techStack;

    public QPostStack(String variable) {
        this(PostStack.class, forVariable(variable), INITS);
    }

    public QPostStack(Path<? extends PostStack> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPostStack(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPostStack(PathMetadata metadata, PathInits inits) {
        this(PostStack.class, metadata, inits);
    }

    public QPostStack(Class<? extends PostStack> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.post = inits.isInitialized("post") ? new QPost(forProperty("post"), inits.get("post")) : null;
        this.techStack = inits.isInitialized("techStack") ? new QTechStack(forProperty("techStack")) : null;
    }

}

