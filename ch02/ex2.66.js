const lookup = (key, set) => is_null(set)
                            ? null
                            : key === entry(set)
                            ? entry(set)
                            : key < entry(set)
                            ? lookup(key, left_branch(set))
                            : lookup(key, right_branch(set));